import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  OrderProduct,
  OrderProductStatus,
} from '@domain/order/order-product.entity';

@Injectable()
export class OrderBatchRepo {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductBatchRepo: Repository<OrderProduct>,
  ) {}

  async findOrderProductsToBeDelivered() {
    return await this.orderProductBatchRepo
      .createQueryBuilder('orderProduct')
      .where('orderProduct.status = :status', {
        status: OrderProductStatus.ON_DELIVERY,
      })
      .getMany();
  }

  async findOrderProductsToBeConfirmed() {
    const week = 1000 * 60 * 60 * 24 * 7;
    const deliveredWeekAgo = new Date(Date.now() - week);

    return await this.orderProductBatchRepo
      .createQueryBuilder('orderProduct')
      .innerJoinAndSelect('orderProduct.histories', 'histories')
      .where('orderProduct.status = :status', {
        status: OrderProductStatus.DELIVERED,
      })
      .andWhere('histories.status = :status', {
        status: OrderProductStatus.DELIVERED,
      })
      .andWhere('histories.createdAt < :deliveredWeekAgo', {
        deliveredWeekAgo,
      })
      .getMany();
  }
}
