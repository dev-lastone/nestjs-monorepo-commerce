import { OrderProduct } from '@domain/order/order-product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Product } from '@domain/product/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AppUserAddress } from '@domain/app-user/app-user-address.entity';
import { Address } from '@domain/_vo/address';
import { MyBaseEntity } from '@common/entity/my-base-entity';

@Entity('order', { schema: 'app' })
export class Order extends MyBaseEntity {
  @ApiProperty({
    example: 1,
  })
  @Expose()
  @Column({ name: 'user_id', type: 'bigint' })
  userId: bigint;

  @ApiProperty({
    example: '01234',
  })
  @Expose()
  @Column(() => Address)
  address: Address;

  @ApiProperty({
    type: [OrderProduct],
  })
  @Expose()
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  products: OrderProduct[];

  static create(userAddress: AppUserAddress, products: Product[]) {
    const order = new Order();
    order.userId = userAddress.userId;
    order.address = userAddress.address;
    order.products = products.map((product) => {
      return OrderProduct.create(product);
    });

    return order;
  }
}
