import { ApiProperty } from '@nestjs/swagger';

export class Product {
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;

  constructor(dto: { id: number; name: string; price: number }) {
    this.id = dto.id;
    this.name = dto.name;
    this.price = dto.price;
  }
}
