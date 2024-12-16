import { ApiProperty } from '@nestjs/swagger';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppUser } from '@domain/app-user/app-user.entity';

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

export enum AppUserPointHistoryAction {
  ORDER_PRODUCT = 'order-product',
  REVIEW = 'review',
  ORDER = 'order',
}

@Entity('user_point', { schema: 'app' })
export class AppUserPoint {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column('bigint', { name: 'user_id' })
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

  // TODO storage 만료일 기준으로 정렬
  // get storages() {
  //   return this.histories
  //     .filter((history) => history.storage.point > 0)
  //     .map((history) => history.storage);
  // }

  save(
    point: number,
    action: AppUserPointHistoryAction,
    actionId: number,
    expirationAt: Date,
  ) {
    this.point += point;

    const storage = new AppUserPointStorage();
    storage.point = point;
    storage.expirationAt = expirationAt;

    const history = this.#createDefaultHistory(action, actionId, point);
    history.storage = storage;

    return history;
  }

  // use(point: number, action: AppUserPointHistoryAction, actionId: number) {
  //   if (this.point < point) {
  //     throw new Error(ERROR_MESSAGES.NotEnoughPoints);
  //   }
  //
  //   this.point -= point;
  //   const history = this.#createDefaultHistory(action, actionId, point);
  //
  //   let remainingPoint = point;
  //   while (remainingPoint > 0) {
  //     const storage = this.storages[0];
  //
  //     if (remainingPoint > storage.point) {
  //       remainingPoint -= storage.point;
  //       storage.point = 0;
  //     } else {
  //       storage.point -= remainingPoint;
  //       remainingPoint = 0;
  //     }
  //
  //     const consumption = new AppUserPointConsumption();
  //     consumption.userPointHistoryId = history.id;
  //     consumption.userPointStorageId = storage.id;
  //     consumption.point = storage.point;
  //
  //     if (history.consumptions) {
  //       history.consumptions.push(consumption);
  //     } else {
  //       history.consumptions = [consumption];
  //     }
  //   }
  //
  //   return history;
  // }

  #createDefaultHistory(
    action: AppUserPointHistoryAction,
    actionId: number,
    point: number,
  ) {
    const history = new AppUserPointHistory();
    history.action = action;
    history.actionId = actionId;
    history.point = point;
    history.remainingPoint = this.point;

    return history;
  }
}
