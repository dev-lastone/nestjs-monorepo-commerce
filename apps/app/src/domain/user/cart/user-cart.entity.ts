import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppUser } from '@domain/app-user/app-user.entity';

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

  @ManyToOne(() => AppUser, (user) => user.carts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: AppUser;

  static create(dto: { userId: number; productId: number; count: number }) {
    const userCart = new UserCart();
    userCart.userId = dto.userId;
    userCart.productId = dto.productId;
    userCart.count = dto.count;
    return userCart;
  }
}
