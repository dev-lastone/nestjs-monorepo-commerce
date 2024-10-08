import { Order } from '@domain/domain/order/order';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepo {
  #seq = 1;
  #orders: Order[] = [];

  #productSeq = 1;

  save(order: Order) {
    order.id = this.#seq++;
    order.products.forEach((product) => {
      product.orderId = order.id;
      product.id = this.#productSeq++;
    });
    this.#orders.push(order);

    return order;
  }

  findByUserId(userId: number) {
    return this.#orders.filter((order) => order.userId === userId);
  }
}
