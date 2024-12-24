import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { ProductService } from '@application/product/product.service';
import { OrdersAppRepo } from './orders.app.repo';
import { OrderService } from '@application/order/order.service';
import { UserAddressService } from '../../../application/user/address/user-address.service';

@Injectable()
export class OrdersAppService {
  constructor(
    private readonly productService: ProductService,
    private readonly orderService: OrderService,

    private readonly userAddressService: UserAddressService,
    private readonly ordersAppRepo: OrdersAppRepo,
  ) {}

  async postOrder(userId: bigint, dto: PostOrdersAppReqDto) {
    // TODO user lazy loading
    const userAddress = await this.userAddressService.getUserAddressById(
      dto.userAddressId,
    );

    if (userAddress.userId !== userId) {
      throw new ForbiddenException();
    }

    const products = await Promise.all(
      dto.productIds.map(async (id) => {
        return await this.productService.findOneProduct(id);
      }),
    );

    return await this.orderService.createOrder(userAddress, products);
  }

  async getOrders(userId: bigint) {
    return await this.ordersAppRepo.findByUserId(userId);
  }
}
