import { Injectable } from '@nestjs/common';
import { orders } from '@domain/domain/order/orders';
import { plainToInstance } from 'class-transformer';
import { GetOrdersResDto } from './orders.admin.dto';

@Injectable()
export class OrdersAdminService {
  constructor() {}

  getOrders() {
    return orders.map((order) => {
      return plainToInstance(GetOrdersResDto, order, {
        excludeExtraneousValues: true,
      });
    });
  }

  getOrder(id: number) {
    return orders.find((order) => {
      return order.id === id;
    });
  }
}
