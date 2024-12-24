import { Order } from '@domain/order/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersAppRepo {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async findByUserId(userId: bigint) {
    return await this.orderRepo.find({
      where: {
        userId,
      },
    });
  }
}
