import { PickType } from '@nestjs/swagger';
import { UserCart } from '@domain/app-user/user-cart.entity';

export class PostUserCartsAppReqDto extends PickType(UserCart, [
  'productId',
  'count',
] as const) {}

export class PutUserCartsAppReqDto extends PickType(UserCart, [
  'count',
] as const) {}
