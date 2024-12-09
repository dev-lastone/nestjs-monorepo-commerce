import { Order } from '@domain/order/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderProduct } from '@domain/order/order-product.entity';
import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepo {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderProduct)
    private readonly orderProductRepo: Repository<OrderProduct>,

    @InjectRepository(OrderProductReview)
    private readonly orderProductReviewRepo: Repository<OrderProductReview>,
  ) {}

  async save(order: Order) {
    return await this.orderRepo.save(order);
  }

  async saveProduct(orderProduct: OrderProduct) {
    return await this.orderProductRepo.save(orderProduct);
  }

  async saveProductReview(orderProductReview: OrderProductReview) {
    return await this.orderProductReviewRepo.save(orderProductReview);
  }

  async find() {
    return await this.orderRepo.find();
  }

  async findOne(id: number) {
    return await this.orderRepo.findOne({
      where: {
        id,
      },
    });
  }

  async findOneProductById(id: number) {
    return await this.orderProductRepo.findOne({
      where: {
        id,
      },
    });
  }

  // TODO order confirm 전용 find 예정
  async findOneOrderProductWishOrderAndProduct(id: number) {
    return await this.orderProductRepo.findOne({
      relations: ['order', 'product'],
      where: {
        id,
      },
    });
  }

  async findOneWishOrderProductReview(id: number) {
    return await this.orderProductRepo.findOne({
      relations: ['product', 'orderProductReview'],
      where: {
        id,
      },
    });
  }
}
