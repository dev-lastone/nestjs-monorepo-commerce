import { Address } from '@domain/_vo/address';
import { AppUserAddress } from '@domain/app-user/app-user-address.entity';
import { appUserStub } from './app-user.stub';

const appUserAddress = AppUserAddress.create({
  userId: appUserStub.id,
  isDefault: true,
  address: Address.create({
    zipcode: '01234',
    address: '서울시 강남구 역삼동 *********',
  }),
});
appUserAddress.id = 1;

export const appUserAddressStub = appUserAddress;
