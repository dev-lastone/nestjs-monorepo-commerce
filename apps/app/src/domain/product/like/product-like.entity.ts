import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '@domain/product/product.entity';

@Entity('product_like', { schema: 'app' })
export class ProductLike {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('int', { name: 'user_id' })
  userId: number;
  @ApiProperty({
    example: 1,
  })
  @Column('int', { name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.likes)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  static create(dto: { userId: number; productId: number }) {
    const productLike = new ProductLike();
    productLike.userId = dto.userId;
    productLike.productId = dto.productId;
    return productLike;
  }
}
