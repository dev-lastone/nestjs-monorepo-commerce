import { OrderProduct } from '@domain/order/order-product.entity';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';
import { PointStrategy } from '@domain/app-user/point/strategy/point.strategy';

export class OrderProductPointStrategy implements PointStrategy {
  private orderProduct: OrderProduct;
  private readonly date: Date;

  constructor(orderProduct: OrderProduct) {
    this.orderProduct = orderProduct;
    this.date = new Date();
  }

  get userId() {
    return this.orderProduct.order.userId;
  }

  get action() {
    return AppUserPointHistoryAction.ORDER_PRODUCT;
  }

  get actionId() {
    return this.orderProduct.id;
  }

  get point() {
    return this.orderProduct.product.price * 0.01;
  }

  get expirationAt() {
    const expirationAt = this.date;
    expirationAt.setDate(expirationAt.getDate() + 365);
    return expirationAt;
  }
}
