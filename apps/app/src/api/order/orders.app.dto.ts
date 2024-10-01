import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class PostOrdersAppReqDto {
  @ApiProperty({
    isArray: true,
    type: Number,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  productIds!: number[];
}
