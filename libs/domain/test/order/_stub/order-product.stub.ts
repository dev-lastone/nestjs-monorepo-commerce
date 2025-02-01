import {
  OrderProduct,
  OrderProductStatus,
} from '@domain/order/order-product.entity';
import { productStub1 } from '../../product/_stub/product.stub';
import { orderStub } from './order.stub';
import { CreateOrderProductReviewDto } from '@domain/order/dto/order-product-review.dto';

const orderProduct = new OrderProduct();
orderProduct.id = 1;
orderProduct.name = productStub1.name;
orderProduct.price = productStub1.price;
orderProduct.status = OrderProductStatus.ORDERED;
orderProduct.product = productStub1;
export const orderProductStub = orderProduct;

const orderProductWithOrderAndProduct = new OrderProduct();
orderProductWithOrderAndProduct.id = 1;
orderProductWithOrderAndProduct.name = productStub1.name;
orderProductWithOrderAndProduct.price = productStub1.price;
orderProductWithOrderAndProduct.status = OrderProductStatus.DELIVERED;
orderProductWithOrderAndProduct.order = orderStub;
orderProductWithOrderAndProduct.product = productStub1;
export const orderProductWithOrderAndProductStub =
  orderProductWithOrderAndProduct;

const orderProductWithOrderAndProductAndReview = new OrderProduct();
orderProductWithOrderAndProductAndReview.id = 1;
orderProductWithOrderAndProductAndReview.name = productStub1.name;
orderProductWithOrderAndProductAndReview.price = productStub1.price;
orderProductWithOrderAndProductAndReview.status = OrderProductStatus.CONFIRMED;
orderProductWithOrderAndProductAndReview.order = orderStub;
orderProductWithOrderAndProductAndReview.product = productStub1;
export const orderProductWithOrderAndProductAndReviewStub =
  orderProductWithOrderAndProductAndReview;

export const createOrderProductReviewDtoStub = {
  score: 5,
  description: '리뷰 내용은 최소 20자가 되야한다.',
} as CreateOrderProductReviewDto;
