import { ApiProperty } from '@nestjs/swagger';

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
