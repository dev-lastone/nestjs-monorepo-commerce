import { OrderProduct } from '@domain/order/order-product.entity';
import { productStub1 } from '../../product/_stub/product.stub';
import { orderStub } from './order.stub';

const orderProduct = OrderProduct.create(productStub1);
orderProduct.id = 1;

export const orderProductStub = orderProduct;

const orderProductWithOrderAndProduct = orderProductStub;
orderProduct.order = orderStub;
orderProduct.product = productStub1;

export const orderProductWithOrderAndProductStub =
  orderProductWithOrderAndProduct;
