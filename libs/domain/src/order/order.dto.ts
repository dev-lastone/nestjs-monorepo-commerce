import { OrderProduct } from '@domain/domain/order/order-product';
import { PickType } from '@nestjs/swagger';

export class PatchOrderProductDto extends PickType(OrderProduct, ['status']) {}
