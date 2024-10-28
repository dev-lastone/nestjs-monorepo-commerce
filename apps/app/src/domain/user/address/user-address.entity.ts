import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppUser } from '@domain/app-user/app-user.entity';
import { Address } from './address';

@Entity('user_address', { schema: 'app' })
export class UserAddress {
  @ApiProperty({
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
  })
  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Column({ name: 'is_default', type: 'boolean' })
  isDefault: boolean;

  @ApiProperty()
  @Column(() => Address)
  address: Address;

  @ManyToOne(() => AppUser, (user) => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: AppUser;

  static create(dto: { userId: number; isDefault: boolean; address: Address }) {
    const userAddress = new UserAddress();
    userAddress.userId = dto.userId;
    userAddress.isDefault = dto.isDefault;
    userAddress.address = dto.address;
    return userAddress;
  }
}
