import { Order } from '@domain/order/order.entity';
import { productStub1 } from '../../product/_stub/product.stub';
import { appUserAddressStub } from '../../app-user/_stub/app-user-address.stub';

const order = Order.create(appUserAddressStub, [productStub1]);
order.id = 1;
order.products[0].id = 1;

export const orderStub = order;
