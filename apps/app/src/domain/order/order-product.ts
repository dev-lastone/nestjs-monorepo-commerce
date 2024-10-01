import { ApiProperty } from '@nestjs/swagger';

export class OrderProduct {
  @ApiProperty({
    example: 1,
  })
  orderId: number;
  @ApiProperty({
    example: 1,
  })
  id: number;
  @ApiProperty({
    example: '상품명',
  })
  name: string;
  @ApiProperty({
    example: 1000,
  })
  price: number;
}
