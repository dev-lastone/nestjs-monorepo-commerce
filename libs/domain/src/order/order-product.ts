import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@domain/domain/product/product';
import { BadRequestException } from '@nestjs/common';

export enum OrderProductStatus {
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
  status: OrderProductStatus;

  constructor(product: Product) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.status = OrderProductStatus.ORDERED;
  }

  deliver() {
    if (this.status === OrderProductStatus.COMPLETED) {
      throw new BadRequestException('이미 배송이 완료된 상품입니다.');
    }
    this.status = OrderProductStatus.DELIVERED;
  }
}
