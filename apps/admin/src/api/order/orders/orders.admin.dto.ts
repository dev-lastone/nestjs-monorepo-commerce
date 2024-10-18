import { OmitType } from '@nestjs/swagger';
import { Order } from '@domain/order/order';

export class GetOrdersResDto extends OmitType(Order, ['products'] as const) {}
