import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { UserPointService } from '@domain/domain/app-user/point/user-point.service';
import { UserPointHistoryAction } from '@domain/domain/app-user/point/user-point';

@Injectable()
export class OrderApplicationService {
  constructor(
    private readonly userPointService: UserPointService,

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

    this.userPointService.savePoint(
      userId,
      orderProduct.product.price * 0.01,
      UserPointHistoryAction.ORDER_PRODUCT,
      orderProduct.id,
    );

    this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }
}
