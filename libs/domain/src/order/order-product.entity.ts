import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@domain/product/product.entity';
import { BadRequestException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { Order } from '@domain/order/order.entity';
import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { PostOrderProductsReviewReqDto } from '../../../../apps/app/src/api/order/order-products/review/order-products-review.app.dto';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderProductStatus {
  ORDERED = 'ordered',
  ON_DELIVERY = 'onDelivery',
  DELIVERED = 'delivered',
  CONFIRMED = 'confirmed',
}

@Entity('order_product', { schema: 'app' })
export class OrderProduct {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
  })
  id: number;
  @ApiProperty({
    example: 1,
  })
  orderId: number;
  productId: number;
  @ApiProperty({
    example: '상품명',
  })
  name: string;
  @ApiProperty({
    example: 1000,
  })
  price: number;
  status: OrderProductStatus;

  order: Order;
  product: Product;
  review: OrderProductReview;

  constructor(product: Product) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.status = OrderProductStatus.ORDERED;
  }

  deliver() {
    if (this.status !== OrderProductStatus.ORDERED) {
      throw new BadRequestException(ERROR_MESSAGES.AlreadyBeenDelivered);
    }
    this.status = OrderProductStatus.ON_DELIVERY;
  }

  confirm() {
    if (this.status !== OrderProductStatus.DELIVERED) {
      throw new BadRequestException(ERROR_MESSAGES.NotDeliveryStatus);
    }
    this.status = OrderProductStatus.CONFIRMED;
  }

  createReview(dto: PostOrderProductsReviewReqDto) {
    if (this.status !== OrderProductStatus.CONFIRMED) {
      throw new BadRequestException(ERROR_MESSAGES.NotConfirmStatus);
    }
    if (this.review) {
      throw new BadRequestException(ERROR_MESSAGES.AlreadyReviewed);
    }

    return new OrderProductReview({
      orderProductId: this.id,
      score: dto.score,
      description: dto.description,
    });
  }
}
