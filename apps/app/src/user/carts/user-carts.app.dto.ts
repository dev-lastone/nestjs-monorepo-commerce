import { PickType } from '@nestjs/swagger';
import { UserCart } from '@domain/domain/app/user-cart';

export class PostUserCartsAppReqDto extends PickType(UserCart, [
  'productId',
  'count',
] as const) {}
