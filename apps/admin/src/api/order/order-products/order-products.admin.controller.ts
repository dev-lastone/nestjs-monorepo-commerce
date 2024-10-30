import { Controller, Param, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/order/order.entity';
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
  async postOrderProductDeliver(@Param('id') id: number) {
    return await this.orderApplicationService.orderProductDeliver(id);
  }
}
