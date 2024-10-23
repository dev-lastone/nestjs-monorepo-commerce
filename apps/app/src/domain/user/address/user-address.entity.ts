import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICreateUserAddress } from './user-address.dto';

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
  @ApiProperty({
    example: '01234',
  })
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'zipcode', type: 'varchar', length: '5' })
  zipcode: string;
  @ApiProperty({
    example: '서울시 강남구 역삼동 *********',
  })
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'address', type: 'varchar', length: '100' })
  address: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Column({ name: 'is_default', type: 'boolean' })
  isDefault: boolean;

  static create(dto: ICreateUserAddress) {
    const userAddress = new UserAddress();
    userAddress.userId = dto.userId;
    userAddress.zipcode = dto.zipcode;
    userAddress.address = dto.address;
    userAddress.isDefault = dto.isDefault;
    return userAddress;
  }
}
