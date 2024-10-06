import { ApiProperty } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

/*
	UserPoint // 총 포인트
	- userId
	- point

	UserPointHistory // 포인트 이력 (행위. 불변)
	- userId
	- id
	- point // 포인트 원본
	- remainingPoint // 이력 시점 총 잔여 포인트
	- action (구매확정, 리뷰확정, 수동 admin, 구매, 구매취소, 만료)
	- actionId
	- createdAt

	UserPointStorage // 적립 포인트 저장소 (포인트 가변)
	- id
	- userPointHistoryId
	- point
	- expirationAt

	UserPointConsumption // 소비(사용, 만료)
	- userPointHistoryId
	- userPointStorageId
	- point

    UserPoint 총 이력 별도. user 테이블 lock 방지, 총합 계산 안하도록
    UserPointHistory 변하지않는 행위 이력.
    UserPointStorage 적립포인트 저장소. 사용될때 일부분만 사용되는것을 커버하기 위함.
    UserPointConsumption 사용 및 만료 이력. 사용 취소 복구. 만료도 사용되는것으로 묶어 소비로 표현.
    한 객체 표현시 각 행위별 사용되지않는 속성 발생, 셀프 참조 발생. 해당 이슈 해결을 위해 분리.
 */

export enum UserPointHistoryAction {
  ORDER_PRODUCT = 'order-product',
  REVIEW = 'review',
  ORDER = 'order',
}

export class UserPoint {
  userId: number;
  @ApiProperty({
    example: 1000,
  })
  point: number;
  histories: UserPointHistory[];

  constructor(userId: number) {
    this.userId = userId;
    this.point = 0;
    this.histories = [];
  }

  // TODO storage 만료일 기준으로 정렬
  get storages() {
    return this.histories
      .filter((history) => history.storage.point > 0)
      .map((history) => history.storage);
  }

  save(point: number, action: UserPointHistoryAction, actionId: number) {
    this.point += point;
    const history = this.#createDefaultHistory(action, actionId, point);

    const storage = new UserPointStorage();
    storage.id = this.histories.length + 1;
    storage.userPointHistoryId = history.id;
    storage.point = point;

    history.storage = storage;
    this.histories.push(history);

    return history;
  }

  use(point: number, action: UserPointHistoryAction, actionId: number) {
    if (this.point < point) {
      throw new Error(ERROR_MESSAGES.NotEnoughPoints);
    }

    this.point -= point;
    const history = this.#createDefaultHistory(action, actionId, point);

    let remainingPoint = point;
    while (remainingPoint > 0) {
      const storage = this.storages[0];

      if (remainingPoint > storage.point) {
        remainingPoint -= storage.point;
        storage.point = 0;
      } else {
        storage.point -= remainingPoint;
        remainingPoint = 0;
      }

      const consumption = new UserPointConsumption();
      consumption.userPointHistoryId = history.id;
      consumption.userPointStorageId = storage.id;
      consumption.point = storage.point;

      if (history.consumptions) {
        history.consumptions.push(consumption);
      } else {
        history.consumptions = [consumption];
      }
    }

    this.histories.push(history);

    return history;
  }

  #createDefaultHistory(
    action: UserPointHistoryAction,
    actionId: number,
    point: number,
  ) {
    const history = new UserPointHistory();
    history.userId = this.userId;
    history.id = this.histories.length + 1;
    history.action = action;
    history.actionId = actionId;
    history.point = point;
    history.remainingPoint = this.point;

    return history;
  }
}

export class UserPointHistory {
  userId: number;
  id: number;
  @ApiProperty({
    example: 1000,
  })
  point: number;
  @ApiProperty({
    example: 2000,
    description: '해당 시점 잔여 포인트',
  })
  remainingPoint: number;
  @ApiProperty({
    enum: UserPointHistoryAction,
  })
  action: UserPointHistoryAction;
  @ApiProperty({
    example: 1,
  })
  actionId: number;
  // createdAt: Date;
  storage?: UserPointStorage;
  consumptions?: UserPointConsumption[];
}

export class UserPointStorage {
  id: number;
  userPointHistoryId: number;
  point: number;
  // expirationAt: Date;
}

export class UserPointConsumption {
  userPointHistoryId: number;
  userPointStorageId: number;
  point: number;
}
