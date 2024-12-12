import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@domain/_vo/address';

export class UserAddressRequestDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isDefault: boolean;

  @ApiProperty()
  @ValidateNested()
  address: Address;
}
