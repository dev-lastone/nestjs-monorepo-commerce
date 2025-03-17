import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ProductLikeDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  productId: number;
}
