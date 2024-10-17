import { Injectable } from '@nestjs/common';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { PatchOrderProductDto } from '@domain/domain/order/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepo) {}

  patchOrderProduct(id: number, dto: PatchOrderProductDto) {
    const orderProduct = this.orderRepo.findOneProductById(id);

    if (dto.status === OrderProductStatus.ON_DELIVERY) {
      orderProduct.deliver();
    }

    this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  orderProductConfirm(id: number) {
    const orderProduct = this.orderRepo.findOneProductById(id);

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
