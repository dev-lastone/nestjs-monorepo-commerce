import {
  OrderProduct,
  OrderProductStatus,
} from '@domain/order/order-product.entity';
import { productStub1 } from '../../product/_stub/product.stub';
import { orderStub } from './order.stub';
import { CreateOrderProductReviewDto } from '@domain/order/dto/order-product-review.dto';

const orderProduct = new OrderProduct();
orderProduct.id = 1n;
orderProduct.name = productStub1.name;
orderProduct.price = productStub1.price;
orderProduct.status = OrderProductStatus.ORDERED;
orderProduct.product = productStub1;
export const orderProductStub = orderProduct;

const orderProductWithOrderAndProduct = orderProductStub;
orderProduct.order = orderStub;
orderProduct.product = productStub1;

export const orderProductWithOrderAndProductStub =
  orderProductWithOrderAndProduct;

export const createOrderProductReviewDtoStub = {
  score: 5,
  description: '리뷰 내용은 최소 20자가 되야한다.',
} as CreateOrderProductReviewDto;
