import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Entity } from 'typeorm';

@Entity('product', { schema: 'app' })
export class Product {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @ApiProperty({
    example: '상품명',
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 10000,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  constructor(dto: { name: string; price: number; stock: number }) {
    this.name = dto.name;
    this.price = dto.price;
    this.stock = dto.stock;
  }
}
