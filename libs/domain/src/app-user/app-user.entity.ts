import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { UserAddress } from '@domain/app-user/address/user-address.entity';
import { UserCart } from '@domain/app-user/cart/user-cart.entity';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { UserPassword } from '@domain/_vo/user-password';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  validateSync,
} from 'class-validator';

@Entity('user', { schema: 'app' })
export class AppUser extends MyBaseEntity {
  @ApiProperty({
    example: '홍길동',
    description: '유저 이름',
    type: String,
    minLength: 2,
    maxLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  @Column({ name: 'name', type: 'varchar', length: 10 })
  name: string;

  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
    type: String,
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string;

  @Column(() => UserPassword, { prefix: false })
  password: UserPassword;

  @OneToOne(() => AppUserPoint, (userPoint) => userPoint.user, {
    cascade: true,
  })
  point: AppUserPoint;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  addresses: UserAddress[];

  @OneToMany(() => UserCart, (userCart) => userCart.user)
  carts: UserCart[];

  static async create(dto: { name: string; email: string; password: string }) {
    const user = new AppUser();
    user.name = dto.name;
    user.email = dto.email;
    user.password = await UserPassword.create(dto.password);
    user.point = AppUserPoint.create();

    const errors = validateSync(this);
    if (errors.length > 0) {
      const errorConstraints = errors.map((error) => {
        return error.constraints;
      });

      throw new Error(JSON.stringify(errorConstraints));
    }

    return user;
  }
}
