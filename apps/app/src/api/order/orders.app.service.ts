import { Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { ProductService } from '@domain/domain/product/product.service';
import { Order } from '@domain/domain/order/order';
import { OrderStatus } from '@domain/domain/order/order-product';
import { orders } from '@domain/domain/order/orders';

@Injectable()
export class OrdersAppService {
  constructor(private readonly productService: ProductService) {}

  postOrder(userId: number, dto: PostOrdersAppReqDto): Order {
    const products = dto.productIds.map((id) => {
      return this.productService.findOneProduct(id);
    });

    const orderId = orders.length + 1;
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

    orders.push(order);

    return order;
  }

  getOrders(userId: number): Order[] {
    return orders.filter((order) => order.userId === userId);
  }
}
