import { PickType } from '@nestjs/swagger';
import { UserCart } from '../user-cart.entity';

export class CreateUserCartDto extends PickType(UserCart, [
  'userId',
  'productId',
  'count',
] as const) {}

export class UpdateUserCartDto extends PickType(UserCart, [
  'userId',
  'id',
  'count',
] as const) {}

export class DeleteUserCartDto extends PickType(UserCart, [
  'userId',
  'id',
] as const) {}
