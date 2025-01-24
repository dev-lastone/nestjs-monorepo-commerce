import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';
import { IsBigInt } from 'class-validator-extended';

export class PostOrdersAppReqDto {
  @ApiProperty({
    example: 1,
  })
  @IsBigInt()
  userAddressId: bigint;

  @ApiProperty({
    isArray: true,
    type: BigInt,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsBigInt({ each: true })
  productIds!: bigint[];

  @ApiProperty({
    default: 0,
  })
  @IsNumber()
  point!: number;
}
