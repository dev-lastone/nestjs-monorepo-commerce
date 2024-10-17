import { Controller, Param, ParseIntPipe, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/domain/order/order';
import { OrderService } from '@domain/domain/order/order.service';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products')
export class OrderProductsAdminController {
  constructor(private readonly orderService: OrderService) {}

  @Version('1')
  @Post(':id/deliver')
  @ApiOkResponse({
    type: Order,
  })
  postOrderProductDeliver(@Param('id', new ParseIntPipe()) id: number) {
    return this.orderService.orderProductDeliver(id);
  }
}
