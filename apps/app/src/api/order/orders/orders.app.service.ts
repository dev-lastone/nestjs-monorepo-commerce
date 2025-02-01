import { Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { OrdersAppRepo } from './orders.app.repo';
import { OrderService } from '@application/order/order.service';

@Injectable()
export class OrdersAppService {
  constructor(
    private readonly orderService: OrderService,
    private readonly ordersAppRepo: OrdersAppRepo,
  ) {}

  async postOrder(dto: PostOrdersAppReqDto & { userId: number }) {
    return await this.orderService.createOrder(dto);
  }

  async getOrders(userId: number) {
    return await this.ordersAppRepo.findByUserId(userId);
  }
}
