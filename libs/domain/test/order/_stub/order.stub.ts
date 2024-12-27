import { Order } from '@domain/order/order.entity';
import { appUserAddressStub } from '../../app-user/_stub/app-user-address.stub';
import { orderProductStub } from './order-product.stub';

const order = new Order();
order.id = 1n;
order.userId = appUserAddressStub.userId;
order.address = appUserAddressStub.address;
order.products = [orderProductStub];

export const orderStub = order;
