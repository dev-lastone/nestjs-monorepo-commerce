import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from '@application/order/order.service';
import { OrderProductsAppRepo } from './order-products.app.repo';

@Injectable()
export class OrderProductsAppService {
  constructor(
    private readonly orderService: OrderService,

    private readonly orderProductsAppRepo: OrderProductsAppRepo,
  ) {}

  async postOrderProductConfirm(dto: { id: number; userId: number }) {
    const { id, userId } = dto;

    const orderProduct =
      await this.orderProductsAppRepo.findOneOrderProductWithOrderAndProduct(
        id,
      );

    if (!orderProduct) {
      throw new NotFoundException();
    }

    if (orderProduct.order.userId !== userId) {
      throw new ForbiddenException();
    }

    return await this.orderService.orderProductConfirm(orderProduct);
  }
}
