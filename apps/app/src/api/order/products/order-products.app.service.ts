import { Injectable } from '@nestjs/common';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { PatchOrderProductAppReqDto } from './order-products.app.dto';

@Injectable()
export class OrderProductsAppService {
  constructor(private readonly orderRepo: OrderRepo) {}

  patchOrderProduct(id: number, dto: PatchOrderProductAppReqDto) {
    const orderProduct = this.orderRepo.findOneProductById(id);

    if (dto.status === OrderProductStatus.CONFIRMED) {
      orderProduct.confirm();
    }

    this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }
}
