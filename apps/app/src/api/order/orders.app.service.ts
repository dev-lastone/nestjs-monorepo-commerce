import { Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { Order } from '../../domain/order/order';

@Injectable()
export class OrdersAppService {
  #orders: Order[] = [
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
  postOrder(userId: number, dto: PostOrdersAppReqDto): Order {
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
