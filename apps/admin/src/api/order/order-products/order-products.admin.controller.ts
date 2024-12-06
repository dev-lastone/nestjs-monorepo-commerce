import { Controller, Param, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/order/order.entity';
import { OrderService } from '@application/order/order.service';

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
  async postOrderProductDeliver(@Param('id') id: number) {
    return await this.orderService.orderProductDeliver(id);
  }
}
