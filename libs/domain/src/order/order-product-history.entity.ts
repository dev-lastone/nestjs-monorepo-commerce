import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { dtoToInstance } from '@common/util/dto-to-instance';
import { BigIntToNumberTransformer } from '@common/entity/transformer';
import {
  OrderProduct,
  OrderProductStatus,
} from '@domain/order/order-product.entity';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { PrimaryGeneratedBigintColumn } from '@common/decorator/primary-generated-bigint-column.decorator';

@Entity('order_product_history', { schema: 'app' })
export class OrderProductHistory {
  @PrimaryGeneratedBigintColumn()
  id: number;

  @Column({
    name: 'order_product_id',
    type: 'bigint',
    transformer: BigIntToNumberTransformer,
  })
  orderProductId: number;

  @IsNotEmpty()
  @MaxLength(20)
  @Column({ name: 'status', type: 'varchar', length: 20 })
  status: OrderProductStatus;

  @ManyToOne(() => OrderProduct, (orderProduct) => orderProduct.histories)
  @JoinColumn({ name: 'order_product_id', referencedColumnName: 'id' })
  orderProduct: OrderProduct;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  static create(orderProduct: OrderProduct) {
    return dtoToInstance({
      class: OrderProductHistory,
      dto: {
        orderProductId: orderProduct.id,
        status: orderProduct.status,
      },
    });
  }
}
