import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@domain/product/product.entity';
import { BadRequestException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { Order } from '@domain/order/order.entity';
import { OrderProductReview } from '@domain/order/order-product-review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { CreateOrderProductReviewDto } from '@domain/order/dto/order-product-review.dto';
import { dtoToInstance } from '@common/util/dto-to-instance';
import { PrimaryGeneratedBigintColumn } from '@common/decorator/primary-generated-bigint-column.decorator';
import { OrderProductHistory } from '@domain/order/order-product-history.entity';

export enum OrderProductStatus {
  ORDERED = 'ordered',
  ON_DELIVERY = 'onDelivery',
  DELIVERED = 'delivered',
  CONFIRMED = 'confirmed',
}

@Entity('order_product', { schema: 'app' })
export class OrderProduct {
  @PrimaryGeneratedBigintColumn()
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: '상품명',
  })
  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1000,
  })
  @Column({ name: 'price', type: 'int' })
  price: number;

  // TODO status classValidator
  @IsNotEmpty()
  @MaxLength(20)
  @Column({ name: 'status', type: 'varchar', length: 20 })
  status: OrderProductStatus;

  @ManyToOne(() => Order, (order) => order.products)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @OneToMany(
    () => OrderProductHistory,
    (orderProductHistory) => orderProductHistory.orderProduct,
  )
  histories: OrderProductHistory[];

  @OneToOne(
    () => OrderProductReview,
    (orderProductReview) => orderProductReview.orderProduct,
  )
  review: OrderProductReview;

  static create(product: Product) {
    if (product.stock < 1) {
      throw new BadRequestException(ERROR_MESSAGES.NotEnoughStock);
    }

    product.stock -= 1;

    return dtoToInstance({
      class: OrderProduct,
      dto: {
        product: product,
        name: product.name,
        price: product.price,
        status: OrderProductStatus.ORDERED,
      },
    });
  }

  deliver() {
    if (this.status !== OrderProductStatus.ORDERED) {
      throw new BadRequestException(ERROR_MESSAGES.AlreadyBeenDelivered);
    }
    this.status = OrderProductStatus.ON_DELIVERY;
  }

  delivered() {
    if (this.status !== OrderProductStatus.ON_DELIVERY) {
      throw new BadRequestException(ERROR_MESSAGES.NotOnDeliveryStatus);
    }
    this.status = OrderProductStatus.DELIVERED;
  }

  confirm() {
    if (this.status !== OrderProductStatus.DELIVERED) {
      throw new BadRequestException(ERROR_MESSAGES.NotDeliveryStatus);
    }
    this.status = OrderProductStatus.CONFIRMED;
  }

  createReview(dto: CreateOrderProductReviewDto) {
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
