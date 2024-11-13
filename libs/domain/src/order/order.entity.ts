import { OrderProduct } from '@domain/order/order-product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Product } from '@domain/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '@domain/app-user/address/address';
import { UserAddress } from '@domain/app-user/address/user-address.entity';

@Entity('order', { schema: 'app' })
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
  })
  @Expose()
  id: number;
  @ApiProperty({
    example: 1,
  })
  @Expose()
  @Column({ name: 'user_id', type: 'int' })
  userId: number;
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
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  products: OrderProduct[];

  static create(userAddress: UserAddress, products: Product[]) {
    const order = new Order();
    order.userId = userAddress.userId;
    order.address = userAddress.address;
    order.products = products.map((product) => {
      return OrderProduct.create(product);
    });

    return order;
  }
}
