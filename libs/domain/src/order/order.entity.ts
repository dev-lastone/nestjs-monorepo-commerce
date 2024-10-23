import { OrderProduct } from '@domain/order/order-product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Product } from '@domain/product/product.entity';
import { UserAddress } from '../../../../apps/app/src/domain/user/address/user-address.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({ type: 'varchar', length: 5 })
  zipcode: string;
  @ApiProperty({
    example: '서울시 강남구 역삼동 *********',
  })
  @Expose()
  @Column({ type: 'varchar', length: 200 })
  address: string;
  @ApiProperty({
    type: [OrderProduct],
  })
  @Expose()
  products: OrderProduct[];

  static create(userAddress: UserAddress, products: Product[]) {
    const order = new Order();
    order.userId = userAddress.userId;
    order.zipcode = userAddress.zipcode;
    order.address = userAddress.address;
    order.products = products.map((product) => {
      return OrderProduct.create(product);
    });

    return order;
  }
}
