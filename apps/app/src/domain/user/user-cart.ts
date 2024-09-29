import { ApiProperty } from '@nestjs/swagger';

export class UserCart {
  userId: number;
  id: number;
  @ApiProperty({
    example: 1,
  })
  productId: number;
  @ApiProperty({
    example: 1,
  })
  count: number;
}
