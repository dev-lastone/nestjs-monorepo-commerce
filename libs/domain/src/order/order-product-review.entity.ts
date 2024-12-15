import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProduct } from '@domain/order/order-product.entity';

@Entity('order_product_review', { schema: 'app' })
export class OrderProductReview {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ name: 'order_product_id', type: 'bigint' })
  orderProductId: number;

  @IsNumber()
  @IsNotEmpty()
  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  // TODO : score 1 ~ 5 범위 체크
  @ApiProperty({
    example: 5,
    description: '점수. 1 ~ 5',
  })
  @IsNotEmpty()
  @IsNumber()
  @Column({ name: 'score', type: 'tinyint' })
  score: number;

  @ApiProperty({
    example: '내용',
    minLength: 20,
    maxLength: 200,
  })
  @IsNotEmpty()
  @IsString()
  @Length(20, 200)
  @Column({ name: 'address', type: 'varchar', length: '200' })
  description: string;

  @OneToOne(() => OrderProduct, (orderProduct) => orderProduct.review)
  @JoinColumn({ name: 'order_product_id', referencedColumnName: 'id' })
  orderProduct: OrderProduct;

  static create(dto: {
    orderProductId: number;
    score: number;
    description: string;
  }) {
    const orderProductReview = new OrderProductReview();
    orderProductReview.orderProductId = dto.orderProductId;
    orderProductReview.score = dto.score;
    orderProductReview.description = dto.description;

    return orderProductReview;
  }
}
