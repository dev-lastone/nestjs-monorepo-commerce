import { productStub1 } from '@domain/domain/product/__stub/product.stub';
import { OrderProduct } from '@domain/domain/order/order-product';

const orderProduct = new OrderProduct(productStub1);
orderProduct.id = 1;

export const orderProductStub = orderProduct;
