import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAddress } from '../../../../apps/app/src/domain/user/address/user-address.entity';
import { UserCart } from '../../../../apps/app/src/domain/user/cart/user-cart.entity';

@Entity('user', { schema: 'app' })
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ default: '홍길동' })
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'name', type: 'varchar', length: 30 })
  name: string;
  @ApiProperty({ default: 'test@test.com' })
  @IsEmail()
  @IsNotEmpty()
  @Column({ name: 'email', type: 'varchar', length: 100 })
  email: string;
  @ApiProperty({ default: '1234' })
  @IsNotEmpty()
  @Column({ name: 'password', type: 'varchar', length: 50 })
  password: string;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  addresses: UserAddress[];

  @OneToMany(() => UserCart, (userCart) => userCart.user)
  carts: UserCart[];

  static create(dto: { name: string; email: string; password: string }) {
    const user = new AppUser();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    return user;
  }
}
