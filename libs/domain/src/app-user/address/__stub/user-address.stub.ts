import { appUserStub } from '@domain/app-user/__stub/app-user.stub';
import { UserAddress } from '../user-address.entity';
import { Address } from '../address';

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
