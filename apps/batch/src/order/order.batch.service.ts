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
  async deliveryOrderProductsAutomatically() {
    const orderProducts =
      await this.orderBatchRepo.findOrderProductsToBeDelivered();

    orderProducts.map((orderProduct) => {
      this.orderService.orderProductDeliver(orderProduct.id);
    });
  }

  @Cron('0 0 0 * * *')
  async confirmOrderProductsAutomatically() {
    const orderProducts =
      await this.orderBatchRepo.findOrderProductsToBeConfirmed();

    orderProducts.map((orderProduct) => {
      this.orderService.orderProductConfirm(orderProduct);
    });
  }
}
