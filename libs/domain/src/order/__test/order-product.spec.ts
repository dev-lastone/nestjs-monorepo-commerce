import {
  OrderProduct,
  OrderProductStatus,
} from '@domain/domain/order/order-product';
import { productStub1 } from '@domain/domain/product/__stub/product.stub';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

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

  describe('deliver', () => {
    it(ERROR_MESSAGES.AlreadyBeenDelivered, () => {
      const orderProduct = new OrderProduct(productStub1);
      orderProduct.status = OrderProductStatus.DELIVERED;

      expect(() => orderProduct.deliver()).toThrowError(
        ERROR_MESSAGES.AlreadyBeenDelivered,
      );
    });

    it('성공', () => {
      const orderProduct = new OrderProduct(productStub1);
      orderProduct.status = OrderProductStatus.ORDERED;
      orderProduct.deliver();
      expect(orderProduct.status).toBe(OrderProductStatus.ON_DELIVERY);
    });
  });

  describe('confirm', () => {
    it(ERROR_MESSAGES.NotDeliveryStatus, () => {
      const orderProduct = new OrderProduct(productStub1);
      orderProduct.status = OrderProductStatus.ON_DELIVERY;
      expect(() => orderProduct.confirm()).toThrowError(
        ERROR_MESSAGES.NotDeliveryStatus,
      );
    });

    it('성공', () => {
      const orderProduct = new OrderProduct(productStub1);
      orderProduct.status = OrderProductStatus.DELIVERED;
      orderProduct.confirm();
      expect(orderProduct.status).toBe(OrderProductStatus.CONFIRMED);
    });
  });
});
