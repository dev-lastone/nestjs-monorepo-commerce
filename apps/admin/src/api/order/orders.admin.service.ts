import { Injectable } from '@nestjs/common';
import { orders } from '@domain/domain/order/orders';

@Injectable()
export class OrdersAdminService {
  constructor() {}

  getOrder(id: number) {
    return orders.find((order) => {
      return order.id === id;
    });
  }
}
