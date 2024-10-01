import { Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';

@Injectable()
export class OrdersAppService {
  #orders: [
    {
      id: number;
      userId: number;
      zipcode: string;
      address: string;
      product: {
        orderId: number;
        id: number;
        name: string;
        price: number;
      }[];
    },
  ] = [
    {
      id: 1,
      userId: 1,
      zipcode: '01234',
      address: '서울시 강남구 역삼동 *********',
      product: [
        {
          orderId: 1,
          id: 1,
          name: 'product-1',
          price: 1000,
        },
      ],
    },
  ];
  postOrder(userId: number, dto: PostOrdersAppReqDto) {
    const orderId = this.#orders.length + 1;
    const order = {
      id: orderId,
      userId,
      zipcode: '01234',
      address: '서울시 강남구 역삼동 *********',
      product: dto.productIds.map((id) => ({
        orderId,
        id,
        name: `product-${id}`,
        price: id * 1000,
      })),
    };

    return order;
  }
}
