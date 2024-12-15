import {
  OrderProduct,
  OrderProductStatus,
} from '@domain/order/order-product.entity';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { productStub1 } from '../product/_stub/product.stub';
import { orderProductStub } from './_stub/order-product.stub';
import { PostOrderProductsReviewReqDto } from '../../../../apps/app/src/api/order/order-products/review/order-product-review.app.dto';

describe('OrderProduct', () => {
  it('constructor', () => {
    const orderProduct = OrderProduct.create(productStub1);
    expect(orderProduct).toEqual({
      productId: productStub1.id,
      name: productStub1.name,
      price: productStub1.price,
      status: OrderProductStatus.ORDERED,
    });
  });

  describe('deliver', () => {
    it(ERROR_MESSAGES.AlreadyBeenDelivered, () => {
      const orderProduct = OrderProduct.create(productStub1);
      orderProduct.status = OrderProductStatus.DELIVERED;

      expect(() => orderProduct.deliver()).toThrowError(
        ERROR_MESSAGES.AlreadyBeenDelivered,
      );
    });

    it('성공', () => {
      const orderProduct = OrderProduct.create(productStub1);
      orderProduct.status = OrderProductStatus.ORDERED;
      orderProduct.deliver();
      expect(orderProduct.status).toBe(OrderProductStatus.ON_DELIVERY);
    });
  });

  describe('confirm', () => {
    it(ERROR_MESSAGES.NotDeliveryStatus, () => {
      const orderProduct = OrderProduct.create(productStub1);
      orderProduct.status = OrderProductStatus.ON_DELIVERY;
      expect(() => orderProduct.confirm()).toThrowError(
        ERROR_MESSAGES.NotDeliveryStatus,
      );
    });

    it('성공', () => {
      const orderProduct = OrderProduct.create(productStub1);
      orderProduct.status = OrderProductStatus.DELIVERED;
      orderProduct.confirm();
      expect(orderProduct.status).toBe(OrderProductStatus.CONFIRMED);
    });
  });

  describe('createReview', () => {
    const dto = {
      score: 5,
      description: '리뷰 내용은 최소 20자가 되야한다.',
    } as PostOrderProductsReviewReqDto;

    it(ERROR_MESSAGES.NotConfirmStatus, () => {
      expect(() => orderProductStub.createReview(dto)).toThrowError(
        ERROR_MESSAGES.NotConfirmStatus,
      );
    });

    it('성공', () => {
      orderProductStub.status = OrderProductStatus.CONFIRMED;
      expect(orderProductStub.createReview(dto)).toEqual({
        orderProductId: orderProductStub.id,
        ...dto,
      });
    });

    it(ERROR_MESSAGES.AlreadyReviewed, () => {
      orderProductStub.status = OrderProductStatus.CONFIRMED;
      orderProductStub.review = { id: 1 } as any;
      expect(() => orderProductStub.createReview(dto)).toThrowError(
        ERROR_MESSAGES.AlreadyReviewed,
      );
    });
  });
});
