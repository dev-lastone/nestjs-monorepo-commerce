import { Order } from '@domain/order/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderProduct } from '@domain/order/order-product.entity';
import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProductHistory } from '@domain/order/order-product-history.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OrderRepo {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderProduct)
    private readonly orderProductRepo: Repository<OrderProduct>,
    @InjectRepository(OrderProductHistory)
    private readonly orderProductHistoryRepo: Repository<OrderProductHistory>,

    @InjectRepository(OrderProductReview)
    private readonly orderProductReviewRepo: Repository<OrderProductReview>,
  ) {}

  async save(order: Order) {
    return await this.orderRepo.save(order);
  }

  @Transactional()
  async saveProduct(orderProduct: OrderProduct) {
    const history = OrderProductHistory.create(orderProduct);
    await this.orderProductHistoryRepo.save(history);
    return await this.orderProductRepo.save(orderProduct);
  }

  async saveProductReview(orderProductReview: OrderProductReview) {
    return await this.orderProductReviewRepo.save(orderProductReview);
  }

  async findOneProductById(id: number) {
    return await this.orderProductRepo.findOne({
      where: {
        id,
      },
    });
  }

  async findOneOrderProductWithOrderAndProductAndReview(id: number) {
    return await this.orderProductRepo.findOne({
      relations: ['order', 'product', 'orderProductReview'],
      where: {
        id,
      },
    });
  }
}
