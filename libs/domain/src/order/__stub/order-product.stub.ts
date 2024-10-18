import { productStub1 } from '@domain/product/__stub/product.stub';
import { OrderProduct } from '@domain/order/order-product';
import { orderStub } from '@domain/order/__stub/order.stub';

const orderProduct = new OrderProduct(productStub1);
orderProduct.id = 1;

export const orderProductStub = orderProduct;

const orderProductWithOrderAndProduct = orderProductStub;
orderProduct.order = orderStub;
orderProduct.product = productStub1;

export const orderProductWithOrderAndProductStub =
  orderProductWithOrderAndProduct;
