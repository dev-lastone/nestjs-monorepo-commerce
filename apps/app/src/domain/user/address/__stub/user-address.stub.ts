import { appUserStub } from '@domain/app-user/__stub/app-user.stub';

export const userAddressStub = {
  id: 1,
  userId: appUserStub.id,
  zipcode: '01234',
  address: '서울시 강남구 역삼동 *********',
  isDefault: true,
};
