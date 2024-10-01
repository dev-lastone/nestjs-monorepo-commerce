import { OrderProduct } from './order-product';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty({
    example: 1,
  })
  id: number;
  @ApiProperty({
    example: 1,
  })
  userId: number;
  @ApiProperty({
    example: '01234',
  })
  zipcode: string;
  @ApiProperty({
    example: '서울시 강남구 역삼동 *********',
  })
  address: string;
  @ApiProperty({
    type: [OrderProduct],
  })
  product: OrderProduct[];
}
