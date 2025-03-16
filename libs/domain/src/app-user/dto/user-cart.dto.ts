import { PickType } from '@nestjs/swagger';
import { AppUserCart } from '../app-user-cart.entity';

export class CreateUserCartDto extends PickType(AppUserCart, [
  'userId',
  'count',
  'product',
] as const) {}

export class UpdateUserCartDto extends PickType(AppUserCart, [
  'userId',
  'id',
  'count',
] as const) {}

export class DeleteUserCartDto extends PickType(AppUserCart, [
  'userId',
  'id',
] as const) {}
