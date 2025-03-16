import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderProduct } from '@domain/order/order-product.entity';
import { ProductLike } from '@domain/product/product-like.entity';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { CreateProductDto } from '@domain/product/dto/product.dto';
import { dtoToInstance } from '@common/util/dto-to-instance';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';

@Entity('product', { schema: 'app' })
export class Product extends MyBaseEntity {
  @ApiProperty({
    example: '상품명',
  })
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @ApiProperty({
    example: 10000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column('int', { name: 'price' })
  price: number;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column('int', { name: 'stock' })
  stock: number;

  @OneToMany(() => ProductLike, (productLike) => productLike.product)
  likes: ProductLike[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];

  @OneToMany(() => AppUserCart, (appUserCart) => appUserCart.product)
  userCarts: AppUserCart[];

  static create(dto: CreateProductDto) {
    return dtoToInstance({ class: Product, dto });
  }
}
