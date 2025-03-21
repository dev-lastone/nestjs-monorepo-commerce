import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppUser } from '@domain/app-user/app-user.entity';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { CreateUserCartDto } from '@domain/app-user/dto/user-cart.dto';
import { dtoToInstance } from '@common/util/dto-to-instance';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BigIntToNumberTransformer } from '@common/entity/transformer';
import { Product } from '@domain/product/product.entity';

@Entity('user_cart', { schema: 'app' })
export class AppUserCart extends MyBaseEntity {
  @IsNotEmpty()
  @IsNumber()
  @Column('bigint', { name: 'user_id', transformer: BigIntToNumberTransformer })
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  @Column('int', { name: 'count' })
  count: number;

  @ManyToOne(() => AppUser, (user) => user.carts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: AppUser;

  @ManyToOne(() => Product, (product) => product.userCarts)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  static create(dto: CreateUserCartDto) {
    return dtoToInstance({ class: AppUserCart, dto });
  }
}
