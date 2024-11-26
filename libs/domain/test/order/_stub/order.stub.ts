import { Order } from '@domain/order/order.entity';
import { productStub1 } from '../../product/_stub/product.stub';
import { userAddressStub } from '../../app-user/_stub/user-address.stub';

const order = Order.create(userAddressStub, [productStub1]);
order.id = 1;
order.products[0].id = 1;

export const orderStub = order;
