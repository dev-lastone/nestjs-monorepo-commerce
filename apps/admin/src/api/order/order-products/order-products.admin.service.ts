import { Injectable } from '@nestjs/common';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { PatchOrderProductAdminReqDto } from './order-products.admin.dto';

@Injectable()
export class OrderProductsAdminService {
  constructor(private readonly orderRepo: OrderRepo) {}

  patchOrderProduct(id: number, dto: PatchOrderProductAdminReqDto) {
    const orderProduct = this.orderRepo.findOneProductById(id);

    if (dto.status === 'delivered') {
      orderProduct.deliver();
    }

    this.orderRepo.saveProduct(orderProduct);
  }
}