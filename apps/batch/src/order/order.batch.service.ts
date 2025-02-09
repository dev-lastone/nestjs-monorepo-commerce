import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OrderBatchRepo } from './order.batch.repo';

@Injectable()
export class OrderBatchService {
  constructor(private readonly orderBatchRepo: OrderBatchRepo) {}

  @Cron('0 0 0 * * *')
  async confirmOrdersAutomatically() {
    const orderProducts =
      await this.orderBatchRepo.findOrderProductsToBeConfirmed();
    // 구매확정 로직(상태변경, 포인트 적립)
    orderProducts.map((orderProduct) => {
      orderProduct.confirm();
    });
  }
}
