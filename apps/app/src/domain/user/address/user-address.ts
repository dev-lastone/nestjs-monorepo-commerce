import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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
}

export class UsersAddresses {
  static of() {
    const usersAddresses = new Map<number, Map<number, UserAddress>>();

    const userAddress = new Map<number, UserAddress>();
    userAddress.set(1, {
      userId: 1,
      id: 1,
      zipcode: '01234',
      address: '서울시 강남구 역삼동 *********',
      isDefault: true,
    });

    return usersAddresses.set(1, userAddress);
  }
}
