import { productStub1 } from '@domain/domain/product/__stub/product.stub';
import { Order } from '@domain/domain/order/order';
import { userAddressStub } from '../../../../../apps/app/src/domain/user/address/__stub/user-address.stub';

export const orderStub = {
  id: 1,
  ...new Order(userAddressStub, [productStub1]),
};
