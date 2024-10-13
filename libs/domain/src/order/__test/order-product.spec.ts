import {
  OrderProduct,
  OrderProductStatus,
} from '@domain/domain/order/order-product';
import { productStub1 } from '@domain/domain/product/__stub/product.stub';

describe('OrderProduct', () => {
  it('constructor', () => {
    const orderProduct = new OrderProduct(productStub1);
    expect(orderProduct).toEqual({
      productId: productStub1.id,
      name: productStub1.name,
      price: productStub1.price,
      status: OrderProductStatus.ORDERED,
    });
  });

  it('deliver', () => {
    const orderProduct = new OrderProduct(productStub1);
    orderProduct.deliver();
    expect(orderProduct.status).toBe(OrderProductStatus.ON_DELIVERY);
  });
});
