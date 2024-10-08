import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOrdersResDto } from './orders.admin.dto';
import { OrderRepo } from '@domain/domain/order/order.repo';

@Injectable()
export class OrdersAdminService {
  constructor(private readonly orderRepo: OrderRepo) {}

  getOrders() {
    return this.orderRepo.find().map((order) => {
      return plainToInstance(GetOrdersResDto, order, {
        excludeExtraneousValues: true,
      });
    });
  }

  getOrder(id: number) {
    return this.orderRepo.findOne(id);
  }
}
