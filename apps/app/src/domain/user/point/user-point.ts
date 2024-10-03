import { ApiProperty } from '@nestjs/swagger';

export enum UserPointActionType {
  ORDER_PRODUCT = 'order-product',
  REVIEW = 'review',
  ORDER = 'order',
}

export class UserPoint {
  userId: number;
  id: number;
  @ApiProperty({
    example: 1000,
  })
  point: number;
  @ApiProperty({
    enum: UserPointActionType,
  })
  actionType: UserPointActionType;
  @ApiProperty({
    example: 1,
  })
  actionId: number;
}
