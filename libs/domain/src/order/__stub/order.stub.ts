import { productStub1 } from '@domain/domain/product/__stub/product.stub';
import { Order } from '@domain/domain/order/order';
import { userAddressStub } from '../../../../../apps/app/src/domain/user/address/__stub/user-address.stub';

const order = new Order(userAddressStub, [productStub1]);
order.products[0].id = 1;

export const orderStub = {
  id: 1,
  ...order,
};
