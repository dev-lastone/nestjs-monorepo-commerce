import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    example: 1,
  })
  id: number;
  @ApiProperty({
    example: '상품명',
  })
  name: string;
  @ApiProperty({
    example: 10000,
  })
  price: number;

  constructor(dto: { id: number; name: string; price: number }) {
    this.id = dto.id;
    this.name = dto.name;
    this.price = dto.price;
  }
}
