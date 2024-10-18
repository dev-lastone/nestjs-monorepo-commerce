import { Controller, Param, ParseIntPipe, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/domain/order/order';
import { OrderApplicationService } from '@application/order/order.application.service';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products')
export class OrderProductsAdminController {
  constructor(
    private readonly orderApplicationService: OrderApplicationService,
  ) {}

  @Version('1')
  @Post(':id/deliver')
  @ApiOkResponse({
    type: Order,
  })
  postOrderProductDeliver(@Param('id', new ParseIntPipe()) id: number) {
    return this.orderApplicationService.orderProductDeliver(id);
  }
}
