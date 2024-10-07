import { Controller, Get, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { orders } from '@domain/domain/order/orders';
import { Order } from '@domain/domain/order/order';

@ApiBearerAuth('jwt')
@ApiTags('orders')
@Controller('orders')
export class OrdersAdminController {
  constructor() {}

  @Version('1')
  @Get()
  @ApiOkResponse({
    type: Order,
    isArray: true,
  })
  getOrders() {
    return orders;
  }

  // TODO 주문 상태 변경
}
