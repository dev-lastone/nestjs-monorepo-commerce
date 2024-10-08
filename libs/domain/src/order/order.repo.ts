import { Order } from '@domain/domain/order/order';
import { Injectable } from '@nestjs/common';
import { orderStub } from '@domain/domain/order/__stub/order.stub';

@Injectable()
export class OrderRepo {
  #id = 2;
  #productId = 2;
  #orders: Order[] = [orderStub];

  save(order: Order) {
    order.id = this.#id++;
    order.products.forEach((product) => {
      product.orderId = order.id;
      product.id = this.#productId++;
    });
    this.#orders.push(order);

    return order;
  }

  find() {
    return this.#orders;
  }

  findOne(id: number) {
    return this.#orders.find((order) => order.id === id);
  }

  findByUserId(userId: number) {
    return this.#orders.filter((order) => order.userId === userId);
  }
}
