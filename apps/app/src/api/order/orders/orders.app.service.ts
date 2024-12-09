import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { Order } from '@domain/order/order.entity';
import { OrderRepo } from '@application/order/order.repo';
import { ProductService } from '@application/product/product.service';
import { AppUserAddressRepo } from '@application/app-user/address/app-user-address.repo';

@Injectable()
export class OrdersAppService {
  constructor(
    private readonly productService: ProductService,
    private readonly orderRepo: OrderRepo,
    private readonly userAddressRepo: AppUserAddressRepo,
  ) {}

  async postOrder(userId: number, dto: PostOrdersAppReqDto) {
    const products = await Promise.all(
      dto.productIds.map(async (id) => {
        return await this.productService.findOneProduct(id);
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
