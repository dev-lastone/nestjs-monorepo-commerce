import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { ProductService } from '@domain/product/product.service';
import { Order } from '@domain/order/order';
import { OrderRepo } from '@domain/order/order.repo';
import { UserAddressRepo } from '../../../domain/user/address/user-address.repo';

@Injectable()
export class OrdersAppService {
  constructor(
    private readonly productService: ProductService,
    private readonly orderRepo: OrderRepo,
    private readonly userAddressRepo: UserAddressRepo,
  ) {}

  postOrder(userId: number, dto: PostOrdersAppReqDto): Order {
    const products = dto.productIds.map((id) => {
      return this.productService.findOneProduct(id);
    });

    const userAddress = this.userAddressRepo.findOneById(dto.userAddressId);

    if (userAddress.userId !== userId) {
      throw new ForbiddenException();
    }

    const order = new Order(userAddress, products);

    return this.orderRepo.save(order);
  }

  getOrders(userId: number): Order[] {
    return this.orderRepo.findByUserId(userId);
  }
}
