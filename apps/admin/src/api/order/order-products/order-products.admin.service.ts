import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderProductsAdminRepo } from './order-products.admin.repo';
import { OrderService } from '@application/order/order.service';

@Injectable()
export class OrderProductsAdminService {
  constructor(
    private readonly orderService: OrderService,

    private readonly orderProductsAdminRepo: OrderProductsAdminRepo,
  ) {}

  async postOrderProductDeliver(id: number) {
    const orderProduct =
      await this.orderProductsAdminRepo.findOneOrderProductById(id);

    if (!orderProduct) {
      throw new NotFoundException();
    }

    return await this.orderService.orderProductDeliver(orderProduct);
  }
}
