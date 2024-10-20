import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderProductReviewDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @IsNumber()
  @IsNotEmpty()
  orderProductId: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  score: number;
  @ApiProperty({
    example: '내용',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
