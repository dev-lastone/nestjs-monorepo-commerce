import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_product_review', { schema: 'app' })
export class OrderProductReview {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  orderProductId: number;
  @ApiProperty({
    example: 5,
    description: '점수. 1 ~ 5',
  })
  @IsNotEmpty()
  score: number;
  @ApiProperty({
    example: '내용',
  })
  @IsNotEmpty()
  description: string;

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
