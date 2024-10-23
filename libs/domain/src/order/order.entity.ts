import { OrderProduct } from './order-product.entity';
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

  constructor(userAddress: UserAddress, products: Product[]) {
    this.userId = userAddress.userId;
    this.zipcode = userAddress.zipcode;
    this.address = userAddress.address;
    this.products = products.map((product) => {
      return new OrderProduct(product);
    });
  }
}
