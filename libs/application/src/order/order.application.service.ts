import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepo } from '@domain/order/order.repo';
import { UserPointHistoryAction } from '@domain/app-user/point/user-point';
import { AppUserPointApplicationService } from '@application/app-user-point/app-user-point.application.service';

@Injectable()
export class OrderApplicationService {
  constructor(
    private readonly appUserPointApplicationService: AppUserPointApplicationService,

    private readonly orderRepo: OrderRepo,
  ) {}

  orderProductDeliver(id: number) {
    const orderProduct = this.orderRepo.findOneProductById(id);

    if (!orderProduct) {
      throw new NotFoundException();
    }

    orderProduct.deliver();

    this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  orderProductConfirm(dto: { id: number; userId: number }) {
    const { id, userId } = dto;

    const orderProduct =
      this.orderRepo.findOneOrderProductWishOrderAndProduct(id);

    if (!orderProduct) {
      throw new NotFoundException();
    }

    if (orderProduct.order.userId !== userId) {
      throw new ForbiddenException();
    }

    orderProduct.confirm();

    this.appUserPointApplicationService.savePoint(
      userId,
      orderProduct.product.price * 0.01,
      UserPointHistoryAction.ORDER_PRODUCT,
      orderProduct.id,
    );

    this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }
}
