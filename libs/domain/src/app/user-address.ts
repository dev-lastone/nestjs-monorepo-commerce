import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UserAddress {
  id: number;
  userId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  zipcode: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean;
}
