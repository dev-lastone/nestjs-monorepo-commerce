import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { ProductService } from '@application/product/product.service';
import { AppUserAddressRepo } from '@application/app-user/address/app-user-address.repo';
import { OrdersAppRepo } from './orders.app.repo';
import { OrderService } from '@application/order/order.service';

@Injectable()
export class OrdersAppService {
  constructor(
    private readonly productService: ProductService,
    private readonly orderService: OrderService,

    private readonly userAddressRepo: AppUserAddressRepo,
    private readonly ordersAppRepo: OrdersAppRepo,
  ) {}

  async postOrder(userId: number, dto: PostOrdersAppReqDto) {
    const userAddress = await this.userAddressRepo.findOneById(
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

  async getOrders(userId: number) {
    return await this.ordersAppRepo.findByUserId(userId);
  }
}
