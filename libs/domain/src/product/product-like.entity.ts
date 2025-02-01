import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '@domain/product/product.entity';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { AppUser } from '@domain/app-user/app-user.entity';
import { dtoToInstance } from '@common/util/dto-to-instance';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BigIntToNumberTransformer } from '@common/entity/transformer';

@Entity('product_like', { schema: 'app' })
export class ProductLike extends MyBaseEntity {
  @IsNotEmpty()
  @IsNumber()
  @Column('bigint', { name: 'user_id', transformer: BigIntToNumberTransformer })
  userId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Column('bigint', {
    name: 'product_id',
    transformer: BigIntToNumberTransformer,
  })
  productId: number;

  @ManyToOne(() => AppUser, (appUser) => appUser.productLikes)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: AppUser;

  @ManyToOne(() => Product, (product) => product.likes)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  static create(dto: { userId: number; productId: number }) {
    return dtoToInstance({ class: ProductLike, dto });
  }
}
