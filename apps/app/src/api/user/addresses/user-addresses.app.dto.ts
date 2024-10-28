import { Address } from '../../../domain/user/address/address';
import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PostUserAddressRequestDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isDefault: boolean;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Address)
  address: Address;
}

export class PutUserAddressRequestDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isDefault: boolean;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Address)
  address: Address;
}
