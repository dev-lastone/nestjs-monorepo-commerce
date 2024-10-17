import { Injectable } from '@nestjs/common';
import { OrderRepo } from '@domain/domain/order/order.repo';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepo) {}

  orderProductDeliver(id: number) {
    const orderProduct = this.orderRepo.findOneProductById(id);

    orderProduct.deliver();

    this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  orderProductConfirm(id: number) {
    const orderProduct = this.orderRepo.findOneProductById(id);

    // TODO orderProduct userId 확인

    orderProduct.confirm();

    // 포인트 적립
    // this.userPointService.savePoint(
    //   userId,
    //   1000, // TODO 상품가 % 1
    //   UserPointHistoryAction.ORDER_PRODUCT,
    //   orderProduct.id,
    // );

    this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }
}
