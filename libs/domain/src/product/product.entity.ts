import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product', { schema: 'app' })
export class Product {
  @PrimaryGeneratedColumn()
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
  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;
  @ApiProperty({
    example: 10000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column('int', { name: 'price' })
  price: number;
  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column('int', { name: 'stock' })
  stock: number;

  static create(dto: { name: string; price: number; stock: number }) {
    const product = new Product();
    product.name = dto.name;
    product.price = dto.price;
    product.stock = dto.stock;

    return product;
  }
}
