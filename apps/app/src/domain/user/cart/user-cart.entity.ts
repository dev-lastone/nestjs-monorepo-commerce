import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_cart', { schema: 'app' })
export class UserCart {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('int', { name: 'user_id' })
  userId: number;
  @ApiProperty({
    example: 1,
  })
  @Column('int', { name: 'product_id' })
  productId: number;
  @ApiProperty({
    example: 1,
  })
  @Column('int', { name: 'count' })
  count: number;
}
