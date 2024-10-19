import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderProductReview {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  orderProductId: number;
  @ApiProperty({
    example: 5,
    description: '점수. 1 ~ 5',
  })
  @IsNotEmpty()
  score: number;
  @ApiProperty({
    example: '내용',
  })
  @IsNotEmpty()
  description: string;
}
