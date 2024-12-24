import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class PostOrdersAppReqDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  userAddressId: bigint;
  @ApiProperty({
    isArray: true,
    type: Number,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  productIds!: bigint[];
}
