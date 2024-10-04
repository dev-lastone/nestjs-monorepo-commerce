import { ApiProperty } from '@nestjs/swagger';

/*
	적립
	- 구매확정
	- 리뷰확정
	- 수동 (관리자)

	사용
	- 구매

	복구
	- 구매 취소 (만료일 지난 경우 취소일 기준 자정)

	UserPoint (유저 총 포인트 관리) - 포인트 분리. user row lock 방지
	- userId
	- point

	UserPointAction (포인트 적립/사용/복구 이력)
	- userId
	- id
	- action (구매확정, 리뷰확정, 수동 admin, 구매, 구매취소)
	- actionId
	- point
	- details ([id: 1, point: 100])
	- createdAt
	- updatedAt
	- expirationAt
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
}

export class UserPointHistory {
  userId: number;
  id: number;
  @ApiProperty({
    enum: UserPointHistoryAction,
  })
  action: UserPointHistoryAction;
  @ApiProperty({
    example: 1,
  })
  actionId: number;
  @ApiProperty({
    example: 1000,
  })
  point: number;
  @ApiProperty({
    example: [{ id: 1, point: 100 }],
  })
  details?: UserPointHistoryDetail[] | null;
  // createdAt: Date;
  // updatedAt: Date;
  // expirationAt?: Date | null;
}

class UserPointHistoryDetail {
  id: number;
  point: number;
}
