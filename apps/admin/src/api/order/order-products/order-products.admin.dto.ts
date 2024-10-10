import { OrderProduct } from '@domain/domain/order/order-product';
import { PickType } from '@nestjs/swagger';

export class PatchOrderProductAdminReqDto extends PickType(OrderProduct, [
  'status',
]) {}
