import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { orders } from '@domain/domain/order/orders';
import { Order } from '@domain/domain/order/order';
import { OrdersAdminService } from './orders.admin.service';

@ApiBearerAuth('jwt')
@ApiTags('orders')
@Controller('orders')
export class OrdersAdminController {
  constructor(private readonly ordersAdminService: OrdersAdminService) {}

  @Version('1')
  @Get()
  @ApiOkResponse({
    type: Order,
    isArray: true,
  })
  getOrders() {
    return orders;
  }

  @Version('1')
  @Get(':id')
  @ApiOkResponse({
    type: Order,
  })
  getOrder(@Param('id', new ParseIntPipe()) id: number) {
    return this.ordersAdminService.getOrder(id);
  }
}
