import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OrderBatchRepo } from './order.batch.repo';
import { OrderService } from '@application/order/order.service';

@Injectable()
export class OrderBatchService {
  constructor(
    private readonly orderService: OrderService,

    private readonly orderBatchRepo: OrderBatchRepo,
  ) {}

  @Cron('0 0 */1 * * *')
  async deliveredOrderProductsAutomatically() {
    const orderProducts =
      await this.orderBatchRepo.findOrderProductsToBeDelivered();

    orderProducts.forEach((orderProduct) => {
      this.orderService.delivered(orderProduct);
    });
  }

  @Cron('0 0 0 * * *')
  async confirmOrderProductsAutomatically() {
    const orderProducts =
      await this.orderBatchRepo.findOrderProductsToBeConfirmed();

    orderProducts.forEach((orderProduct) => {
      this.orderService.orderProductConfirm(orderProduct);
    });
  }
}
