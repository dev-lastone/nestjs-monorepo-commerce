import { OmitType } from '@nestjs/swagger';
import { Order } from '@domain/order/order.entity';

export class GetOrdersResDto extends OmitType(Order, ['products'] as const) {}
