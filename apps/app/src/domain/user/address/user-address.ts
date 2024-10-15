import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ICreateUserAddress } from './user-address.dto';

export class UserAddress {
  @ApiProperty({
    example: 1,
  })
  userId: number;
  @ApiProperty({
    example: 1,
  })
  id: number;
  @ApiProperty({
    example: '01234',
  })
  @IsNotEmpty()
  @IsString()
  zipcode: string;
  @ApiProperty({
    example: '서울시 강남구 역삼동 *********',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean;

  constructor(dto: ICreateUserAddress) {
    this.userId = dto.userId;
    this.zipcode = dto.zipcode;
    this.address = dto.address;
    this.isDefault = dto.isDefault;
  }
}
