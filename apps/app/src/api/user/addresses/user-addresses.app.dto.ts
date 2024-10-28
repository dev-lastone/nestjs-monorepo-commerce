import { Address } from '../../../domain/user/address/address';
import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserAddressRequestDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isDefault: boolean;

  @ApiProperty()
  @ValidateNested()
  address: Address;
}
