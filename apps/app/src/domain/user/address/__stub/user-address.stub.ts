import { appUserStub } from '@domain/app-user/__stub/app-user.stub';
import { UserAddress } from '../user-address.entity';

const userAddress = UserAddress.create({
  userId: appUserStub.id,
  zipcode: '01234',
  address: '서울시 강남구 역삼동 *********',
  isDefault: true,
});
userAddress.id = 1;

export const userAddressStub = userAddress;
