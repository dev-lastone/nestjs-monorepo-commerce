import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@domain/domain/product/product';

export enum OrderStatus {
  ORDERED = 'ordered',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
}

export class OrderProduct {
  @ApiProperty({
    example: 1,
  })
  id: number;
  @ApiProperty({
    example: 1,
  })
  orderId: number;
  productId: number;
  @ApiProperty({
    example: '상품명',
  })
  name: string;
  @ApiProperty({
    example: 1000,
  })
  price: number;
  status: OrderStatus;

  constructor(product: Product) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.status = OrderStatus.ORDERED;
  }
}
