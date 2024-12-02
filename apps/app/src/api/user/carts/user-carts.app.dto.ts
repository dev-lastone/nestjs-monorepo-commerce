import { PickType } from '@nestjs/swagger';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';

export class PostUserCartsAppReqDto extends PickType(AppUserCart, [
  'productId',
  'count',
] as const) {}

export class PutUserCartsAppReqDto extends PickType(AppUserCart, [
  'count',
] as const) {}
