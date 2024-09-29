import { PickType } from '@nestjs/swagger';
import { UserCart } from '../../../domain/user/cart/user-cart';

export class PostUserCartsAppReqDto extends PickType(UserCart, [
  'productId',
  'count',
] as const) {}

export class PutUserCartsAppReqDto extends PickType(UserCart, [
  'count',
] as const) {}
