import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { dtoToInstance } from '@common/util/dto-to-instance';
import {
  OrderProduct,
  OrderProductStatus,
} from '@domain/order/order-product.entity';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { PrimaryGeneratedBigintColumn } from '@common/decorator/primary-generated-bigint-column.decorator';

@Entity('order_product_history', { schema: 'app' })
@Index(['orderProduct'])
export class OrderProductHistory {
  @PrimaryGeneratedBigintColumn()
  id: number;

  @IsNotEmpty()
  @MaxLength(20)
  @Column({ name: 'status', type: 'varchar', length: 20 })
  status: OrderProductStatus;

  @ManyToOne(() => OrderProduct, (orderProduct) => orderProduct.histories, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
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
        orderProduct: orderProduct,
        status: orderProduct.status,
      },
    });
  }
}
