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
    } else if (dto.status === OrderProductStatus.CONFIRMED) {
      orderProduct.confirm();
    }

    this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }
}
