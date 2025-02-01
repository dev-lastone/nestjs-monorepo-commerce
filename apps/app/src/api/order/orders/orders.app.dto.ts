import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class PostOrdersAppReqDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  userAddressId: number;

  @ApiProperty({
    isArray: true,
    type: BigInt,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  productIds!: number[];

  @ApiProperty({
    default: 0,
  })
  @IsNumber()
  point!: number;
}
