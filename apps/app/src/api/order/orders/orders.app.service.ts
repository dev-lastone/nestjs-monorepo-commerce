import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { Order } from '@domain/order/order.entity';
import { OrderRepo } from '@application/order/order.repo';
import { ProductApplicationService } from '@application/product/product.application.service';
import { UserAddressRepo } from '@application/app-user/address/user-address.repo';

@Injectable()
export class OrdersAppService {
  constructor(
    private readonly productApplicationService: ProductApplicationService,
    private readonly orderRepo: OrderRepo,
    private readonly userAddressRepo: UserAddressRepo,
  ) {}

  async postOrder(userId: number, dto: PostOrdersAppReqDto) {
    const products = await Promise.all(
      dto.productIds.map(async (id) => {
        return await this.productApplicationService.findOneProduct(id);
      }),
    );

    const userAddress = await this.userAddressRepo.findOneById(
      dto.userAddressId,
    );

    if (userAddress.userId !== userId) {
      throw new ForbiddenException();
    }

    const order = Order.create(userAddress, products);

    return await this.orderRepo.save(order);
  }

  async getOrders(userId: number) {
    return await this.orderRepo.findByUserId(userId);
  }
}
