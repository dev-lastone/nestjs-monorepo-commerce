import { ApiProperty } from '@nestjs/swagger';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AppUser } from '@domain/app-user/app-user.entity';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AppUserPointConsumption } from '@domain/app-user/point/app-user-point-consumption.entity';
import { AppUserPointDto } from '@domain/app-user/dto/app-user-point.dto';
import { PointStrategy } from '@domain/app-user/point/strategy/point.strategy';
import { BadRequestException } from '@nestjs/common';
import { PrimaryGeneratedBigintColumn } from '@common/decorator/primary-generated-bigint-column.decorator';
import { BigIntToNumberTransformer } from '@common/entity/transformer';
import { MINIMUM_USE_POINT } from '@common/constant/constants';

/*
	AppUserPoint // 총 포인트
	- userId
	- point

	AppUserPointHistory // 포인트 이력 (행위. 불변)
	- id
	- userId
	- point // 포인트 원본
	- remainingPoint // 이력 시점 총 잔여 포인트
	- action (구매확정, 리뷰확정, 수동 admin, 구매, 구매취소, 만료)
	- actionId
	- createdAt

	AppUserPointStorage // 적립 포인트 저장소 (포인트 가변)
	- id
	- appUserPointHistoryId
	- point
	- expirationAt

	AppUserPointConsumption // 소비(사용, 만료)
	- appUserPointHistoryId
	- appUserPointStorageId
	- point

    AppUserPoint 총 이력 별도. user 테이블 lock 방지, 총합 계산 안하도록
    AppUserPointHistory 변하지않는 행위 이력.
    AppUserPointStorage 적립포인트 개별 저장소. (사용될때 일부분만 사용되는것을 커버하기 위함)
    AppUserPointConsumption 사용 및 만료 이력. 사용 취소 / 복구. (만료도 사용되는것으로 묶어 소비로 표현)
    한 객체 표현시 각 행위별 사용되지않는 속성 발생, 셀프 참조 발생. 해당 이슈 해결을 위해 분리.
 */

// TODO 적립 사용 구분 필요
export enum AppUserPointHistoryAction {
  ORDER_PRODUCT = 'order_product',
  REVIEW = 'order_product_review',
  ORDER = 'order',
  EXPIRE = 'expire',
}

@Entity('user_point', { schema: 'app' })
export class AppUserPoint {
  @PrimaryGeneratedBigintColumn()
  id: number;

  @Column('bigint', { name: 'user_id', transformer: BigIntToNumberTransformer })
  userId: number;

  @ApiProperty({
    example: 1000,
  })
  @Column('int', { name: 'point', default: 0 })
  point: number;

  @OneToOne(() => AppUser, (user) => user.point)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: AppUser;

  @OneToMany(() => AppUserPointHistory, (history) => history.userPoint)
  histories?: AppUserPointHistory[];

  static create() {
    const appUserPoint = new AppUserPoint();
    appUserPoint.point = 0;
    return appUserPoint;
  }

  save(dto: PointStrategy) {
    this.point += dto.point;

    const storage = new AppUserPointStorage();
    storage.point = dto.point;
    storage.expirationAt = dto.expirationAt;

    const history = this.#createDefaultHistory(dto);
    history.storage = storage;

    return history;
  }

  use(dto: AppUserPointDto) {
    if (dto.point < MINIMUM_USE_POINT) {
      throw new BadRequestException(ERROR_MESSAGES.MinimumUsePoint);
    }

    if (this.point < dto.point) {
      throw new Error(ERROR_MESSAGES.NotEnoughPoints);
    }

    this.point -= dto.point;

    const createHistory = this.#createDefaultHistory(dto);
    let remainingPoint = dto.point;
    for (const history of this.histories) {
      if (remainingPoint <= 0) break;

      const storage = history.storage;

      let usedPoint = 0;
      if (remainingPoint > storage.point) {
        usedPoint = storage.point;
        remainingPoint -= storage.point;
        storage.point = 0;
      } else {
        usedPoint = remainingPoint;
        storage.point -= remainingPoint;
        remainingPoint = 0;
      }

      const consumption = new AppUserPointConsumption();
      consumption.userPointStorageId = storage.id;
      consumption.point = usedPoint;

      if (!createHistory.consumptions) {
        createHistory.consumptions = [];
      }
      createHistory.consumptions.push(consumption);
    }

    return createHistory;
  }

  expire() {
    const point = this.histories.reduce(
      (acc, history) => acc + history.storage.point,
      0,
    );

    this.point -= point;

    const createConsumptions = this.histories.map((history) => {
      const consumption = new AppUserPointConsumption();
      consumption.userPointStorageId = history.storage.id;
      consumption.point = history.storage.point;
      return consumption;
    });

    this.histories.forEach((history) => {
      history.storage.point = 0;
      return history;
    });

    const createHistory = this.#createDefaultHistory({
      point,
      action: AppUserPointHistoryAction.EXPIRE,
    });
    createHistory.consumptions = createConsumptions;

    return createHistory;
  }

  // TODO abstract?
  // point, remainingPoint 점검 필요
  #createDefaultHistory(dto: AppUserPointDto) {
    const history = new AppUserPointHistory();
    history.userPoint = this;
    history.action = dto.action;
    history.actionId = dto.actionId;
    history.point = dto.point; // actionPoint
    history.remainingPoint = this.point;

    return history;
  }
}
