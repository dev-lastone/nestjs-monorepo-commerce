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

  constructor(dto: {
    orderProductId: number;
    score: number;
    description: string;
  }) {
    this.orderProductId = dto.orderProductId;
    this.score = dto.score;
    this.description = dto.description;
  }
}
