import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { OrderProduct } from '@domain/order/order-product.entity';
import { dtoToInstance } from '@common/util/dto-to-instance';
import { MyBaseEntity } from '@common/entity/my-base-entity';

@Entity('order_product_review', { schema: 'app' })
export class OrderProductReview extends MyBaseEntity {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ name: 'order_product_id', type: 'bigint' })
  orderProductId: number;

  @ApiProperty({
    example: 5,
    description: '점수. 1 ~ 5',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  @Column({ name: 'score', type: 'int2' })
  score: number;

  @ApiProperty({
    example: '내용',
    minLength: 20,
    maxLength: 200,
  })
  @IsNotEmpty()
  @IsString()
  @Length(20, 200)
  @Column({ name: 'description', type: 'varchar', length: '200' })
  description: string;

  @OneToOne(() => OrderProduct, (orderProduct) => orderProduct.review)
  @JoinColumn({ name: 'order_product_id', referencedColumnName: 'id' })
  orderProduct: OrderProduct;

  static create(dto: {
    orderProductId: number;
    score: number;
    description: string;
  }) {
    return dtoToInstance({
      class: OrderProductReview,
      dto,
    });
  }
}
