import { Order } from '@domain/domain/order/order';
import { Injectable } from '@nestjs/common';
import { orderStub } from '@domain/domain/order/__stub/order.stub';
import { OrderProduct } from '@domain/domain/order/order-product';

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

  saveProduct(orderProduct: OrderProduct) {
    const order = this.#orders.find((order) =>
      order.products.find((product) => product.id === orderProduct.id),
    );
    const product = order.products.find(
      (product) => product.id === orderProduct.id,
    );
    product.status = orderProduct.status;

    return product;
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

  findOneProductById(id: number) {
    return this.#orders
      .flatMap((order) => order.products)
      .find((product) => product.id === id);
  }
}
