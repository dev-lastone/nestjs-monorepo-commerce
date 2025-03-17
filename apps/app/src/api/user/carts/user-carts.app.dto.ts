import { ApiProperty, PickType } from '@nestjs/swagger';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';
import { IsNumber } from 'class-validator';

export class PostUserCartsAppReqDto extends PickType(AppUserCart, [
  'count',
] as const) {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  productId: number;
}

export class PutUserCartsAppReqDto extends PickType(AppUserCart, [
  'count',
] as const) {}
