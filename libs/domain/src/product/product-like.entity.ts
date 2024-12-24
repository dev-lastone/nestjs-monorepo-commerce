import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '@domain/product/product.entity';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { AppUser } from '@domain/app-user/app-user.entity';
import { dtoToInstance } from '@common/util/dto-to-instance';
import { IsNotEmpty } from 'class-validator';
import { IsBigInt } from 'class-validator-extended';

@Entity('product_like', { schema: 'app' })
export class ProductLike extends MyBaseEntity {
  @IsNotEmpty()
  @IsBigInt()
  @Column('bigint', { name: 'user_id' })
  userId: bigint;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsBigInt()
  @Column('bigint', { name: 'product_id' })
  productId: bigint;

  @ManyToOne(() => AppUser, (appUser) => appUser.productLikes)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: AppUser;

  @ManyToOne(() => Product, (product) => product.likes)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  static create(dto: { userId: bigint; productId: bigint }) {
    return dtoToInstance({ class: ProductLike, dto });
  }
}
