import { OrderProduct } from './order-product';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Order {
  @ApiProperty({
    example: 1,
  })
  @Expose()
  id: number;
  @ApiProperty({
    example: 1,
  })
  @Expose()
  userId: number;
  @ApiProperty({
    example: '01234',
  })
  @Expose()
  zipcode: string;
  @ApiProperty({
    example: '서울시 강남구 역삼동 *********',
  })
  @Expose()
  address: string;
  @ApiProperty({
    type: [OrderProduct],
  })
  @Expose()
  products: OrderProduct[];
}
