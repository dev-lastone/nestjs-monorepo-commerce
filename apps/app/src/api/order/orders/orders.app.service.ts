import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { Order } from '@domain/order/order.entity';
import { OrderRepo } from '@domain/order/order.repo';
import { UserAddressRepo } from '../../../domain/user/address/user-address.repo';
import { ProductApplicationService } from '@application/product/product.application.service';

@Injectable()
export class OrdersAppService {
  constructor(
    private readonly productApplicationService: ProductApplicationService,
    private readonly orderRepo: OrderRepo,
    private readonly userAddressRepo: UserAddressRepo,
  ) {}

  async postOrder(userId: number, dto: PostOrdersAppReqDto) {
    const products = dto.productIds.map((id) => {
      return this.productApplicationService.findOneProduct(id);
    });

    const userAddress = await this.userAddressRepo.findOneById(
      dto.userAddressId,
    );

    if (userAddress.userId !== userId) {
      throw new ForbiddenException();
    }

    const order = new Order(userAddress, products);

    return this.orderRepo.save(order);
  }

  async getOrders(userId: number) {
    return await this.orderRepo.findByUserId(userId);
  }
}
