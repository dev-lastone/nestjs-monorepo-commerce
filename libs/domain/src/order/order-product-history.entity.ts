import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { dtoToInstance } from '@common/util/dto-to-instance';
import { BigIntToNumberTransformer } from '@common/entity/transformer';
import {
  OrderProduct,
  OrderProductStatus,
} from '@domain/order/order-product.entity';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { MyBaseEntity } from '@common/entity/my-base-entity';

@Entity('order_product_history', { schema: 'app' })
export class OrderProductHistory extends MyBaseEntity {
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
