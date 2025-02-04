import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@domain/order/order.entity';
import { OrderProductStatus } from '@domain/order/order-product.entity';

@Injectable()
export class OrderRepo {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  // TODO 주문이력 관리 추가 설계 필요
  async findOrderProductsToBeConfirmed() {
    return await this.orderRepo
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.products', 'products')
      .where('order.')
      .andWhere('products.status = :status', {
        status: OrderProductStatus.DELIVERED,
      })
      .getMany();
  }
}
