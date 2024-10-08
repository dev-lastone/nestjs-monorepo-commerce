import { Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { ProductService } from '@domain/domain/product/product.service';
import { Order } from '@domain/domain/order/order';
import { UserAddress } from '../../domain/user/address/user-address';
import { OrderRepo } from '@domain/domain/order/order.repo';

@Injectable()
export class OrdersAppService {
  constructor(
    private readonly productService: ProductService,
    private readonly orderRepo: OrderRepo,
  ) {}

  postOrder(userId: number, dto: PostOrdersAppReqDto): Order {
    const products = dto.productIds.map((id) => {
      return this.productService.findOneProduct(id);
    });

    // TODO address 조회
    const userAddress = new UserAddress();
    userAddress.userId = userId;
    userAddress.zipcode = '01234';
    userAddress.address = '서울시 강남구 역삼동 *********';

    const order = new Order(userAddress, products);

    return this.orderRepo.save(order);
  }

  getOrders(userId: number): Order[] {
    return this.orderRepo.findByUserId(userId);
  }
}
