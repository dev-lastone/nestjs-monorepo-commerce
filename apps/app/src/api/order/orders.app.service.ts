import { Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { Order } from '../../domain/order/order';
import { OrderStatus } from '../../domain/order/order-product';
import { ProductService } from '@domain/domain/product/product.service';
import { productStub1 } from '@domain/domain/product/__stub/product.stub';

@Injectable()
export class OrdersAppService {
  constructor(private readonly productService: ProductService) {}

  #orders: Order[] = [
    {
      id: 1,
      userId: 1,
      zipcode: '01234',
      address: '서울시 강남구 역삼동 *********',
      products: [
        {
          orderId: 1,
          id: 1,
          productId: productStub1.id,
          name: productStub1.name,
          price: productStub1.price,
          status: OrderStatus.ORDERED,
        },
      ],
    },
  ];
  postOrder(userId: number, dto: PostOrdersAppReqDto): Order {
    const products = dto.productIds.map((id) => {
      return this.productService.findOneProduct(id);
    });

    const orderId = this.#orders.length + 1;
    const order = {
      id: orderId,
      userId,
      zipcode: '01234',
      address: '서울시 강남구 역삼동 *********',
      products: products.map((product, id) => ({
        orderId,
        id: id + 1,
        productId: product.id,
        name: product.name,
        price: product.price,
        status: OrderStatus.ORDERED,
      })),
    };

    this.#orders.push(order);

    return order;
  }

  getOrders(userId: number): Order[] {
    return this.#orders.filter((order) => order.userId === userId);
  }
}
