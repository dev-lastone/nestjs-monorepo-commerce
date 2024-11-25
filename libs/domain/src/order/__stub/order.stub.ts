import { productStub1 } from '@domain/product/__stub/product.stub';
import { Order } from '@domain/order/order.entity';
import { userAddressStub } from '@domain/app-user/__stub/user-address.stub';

const order = Order.create(userAddressStub, [productStub1]);
order.id = 1;
order.products[0].id = 1;

export const orderStub = order;
