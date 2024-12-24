import { Controller, Get, Param, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/order/order.entity';
import { OrdersAdminService } from './orders.admin.service';
import { GetOrdersResDto } from './orders.admin.dto';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('orders')
export class OrdersAdminController {
  constructor(private readonly ordersAdminService: OrdersAdminService) {}

  @Version('1')
  @Get()
  @ApiOkResponse({
    type: GetOrdersResDto,
    isArray: true,
  })
  getOrders() {
    return this.ordersAdminService.getOrders();
  }

  @Version('1')
  @Get(':id')
  @ApiOkResponse({
    type: Order,
  })
  getOrder(@Param('id') id: bigint) {
    return this.ordersAdminService.getOrder(id);
  }
}
