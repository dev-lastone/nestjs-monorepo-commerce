import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOrdersResDto } from './orders.admin.dto';
import { OrderRepo } from '@application/order/order.repo';

@Injectable()
export class OrdersAdminService {
  constructor(private readonly orderRepo: OrderRepo) {}

  async getOrders() {
    const list = await this.orderRepo.find();
    return list.map((order) => {
      return plainToInstance(GetOrdersResDto, order, {
        excludeExtraneousValues: true,
      });
    });
  }

  async getOrder(id: number) {
    return await this.orderRepo.findOne(id);
  }
}
