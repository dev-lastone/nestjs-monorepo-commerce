import { Injectable } from '@nestjs/common';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { UserPointService } from '@domain/domain/app-user/point/user-point.service';
import { UserPointHistoryAction } from '@domain/domain/app-user/point/user-point';

@Injectable()
export class OrderService {
  constructor(
    private readonly userPointService: UserPointService,

    private readonly orderRepo: OrderRepo,
  ) {}

  orderProductDeliver(id: number) {
    const orderProduct = this.orderRepo.findOneProductById(id);

    orderProduct.deliver();

    this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  orderProductConfirm(dto: { id: number; userId: number }) {
    const { id, userId } = dto;

    const orderProduct =
      this.orderRepo.findOneOrderProductWishOrderAndProduct(id);

    // TODO orderProduct userId 확인

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
