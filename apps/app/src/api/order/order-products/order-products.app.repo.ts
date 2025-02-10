import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProduct } from '@domain/order/order-product.entity';

@Injectable()
export class OrderProductsAppRepo {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductRepo: Repository<OrderProduct>,
  ) {}

  async findOneOrderProductWithOrderAndProduct(id: number) {
    return await this.orderProductRepo.findOne({
      relations: ['order', 'product'],
      where: {
        id,
      },
    });
  }
}
