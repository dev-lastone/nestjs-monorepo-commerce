import { Address } from '@domain/_vo/address';
import { UserAddress } from '@domain/app-user/user-address.entity';
import { appUserStub } from './app-user.stub';

const userAddress = UserAddress.create({
  userId: appUserStub.id,
  isDefault: true,
  address: Address.create({
    zipcode: '01234',
    address: '서울시 강남구 역삼동 *********',
  }),
});
userAddress.id = 1;

export const userAddressStub = userAddress;
