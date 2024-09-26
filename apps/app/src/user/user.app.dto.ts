import { PickType } from '@nestjs/swagger';
import { UserAddress } from '@domain/domain/app/user-address';

export class PostUserAddressRequestDto extends PickType(UserAddress, [
  'zipcode',
  'address',
  'isDefault',
] as const) {}