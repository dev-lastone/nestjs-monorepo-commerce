import { PickType } from '@nestjs/swagger';
import { UserAddress } from '../../../domain/user/user-address';

export class PostUserAddressRequestDto extends PickType(UserAddress, [
  'zipcode',
  'address',
  'isDefault',
] as const) {}

export class PutUserAddressRequestDto extends PickType(UserAddress, [
  'zipcode',
  'address',
  'isDefault',
] as const) {}
