import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppUser } from '@domain/app-user/app-user.entity';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { CreateUserCartDto } from '@domain/app-user/dto/user-cart.dto';
import { dtoToInstance } from '@common/util/dto-to-instance';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BigIntToNumberTransformer } from '@common/entity/transformer';

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
  @Column('bigint', {
    name: 'product_id',
    transformer: BigIntToNumberTransformer,
  })
  productId: number;

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

  static create(dto: CreateUserCartDto) {
    return dtoToInstance({ class: AppUserCart, dto });
  }
}
