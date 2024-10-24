import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  static create(dto: { userId: number; productId: number }) {
    const productLike = new ProductLike();
    productLike.userId = dto.userId;
    productLike.productId = dto.productId;
    return productLike;
  }
}
