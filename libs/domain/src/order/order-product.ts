import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@domain/domain/product/product';

export enum OrderProductStatus {
  ORDERED = 'ordered',
  ON_DELIVERY = 'onDelivery',
  CONFIRMED = 'confirmed',
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
    // TODO 완료 처리 작업 후 주석 해제
    // if (this.status === OrderProductStatus.COMPLETED) {
    //   throw new BadRequestException('이미 배송이 완료된 상품입니다.');
    // }
    this.status = OrderProductStatus.ON_DELIVERY;
  }
}
