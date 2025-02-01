import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOrdersResDto } from './orders.admin.dto';
import { OrdersAdminRepo } from './orders.admin.repo';

@Injectable()
export class OrdersAdminService {
  constructor(private readonly ordersAdminRepo: OrdersAdminRepo) {}

  async getOrders() {
    const list = await this.ordersAdminRepo.find();
    return list.map((order) => {
      return plainToInstance(GetOrdersResDto, order, {
        excludeExtraneousValues: true,
      });
    });
  }

  async getOrder(id: number) {
    return await this.ordersAdminRepo.findOne(id);
  }
}
