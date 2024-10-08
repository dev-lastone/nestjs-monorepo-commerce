import { productStub1 } from '@domain/domain/product/__stub/product.stub';
import { OrderStatus } from '@domain/domain/order/order-product';

export const orderStub = {
  id: 1,
  userId: 1,
  zipcode: '01234',
  address: '서울시 강남구 역삼동 *********',
  products: [
    {
      id: 1,
      orderId: 1,
      productId: productStub1.id,
      name: productStub1.name,
      price: productStub1.price,
      status: OrderStatus.ORDERED,
    },
  ],
};
