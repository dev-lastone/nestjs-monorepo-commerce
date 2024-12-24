import { Order } from '@domain/order/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersAdminRepo {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async find() {
    return await this.orderRepo.find();
  }

  async findOne(id: bigint) {
    return await this.orderRepo.findOne({
      where: {
        id,
      },
    });
  }
}
