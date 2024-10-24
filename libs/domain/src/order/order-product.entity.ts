import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@domain/product/product.entity';
import { BadRequestException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { Order } from '@domain/order/order.entity';
import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { PostOrderProductsReviewReqDto } from '../../../../apps/app/src/api/order/order-products/review/order-products-review.app.dto';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Order, (order) => order.products)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  review: OrderProductReview;

  static create(product: Product) {
    const orderProduct = new OrderProduct();
    orderProduct.productId = product.id;
    orderProduct.name = product.name;
    orderProduct.price = product.price;
    orderProduct.status = OrderProductStatus.ORDERED;

    return orderProduct;
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

    return OrderProductReview.create({
      orderProductId: this.id,
      score: dto.score,
      description: dto.description,
    });
  }
}
