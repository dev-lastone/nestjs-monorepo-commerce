import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@domain/app-user/address/address';

export class UserAddressRequestDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isDefault: boolean;

  @ApiProperty()
  @ValidateNested()
  address: Address;
}
