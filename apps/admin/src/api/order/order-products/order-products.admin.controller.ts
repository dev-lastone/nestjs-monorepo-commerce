import { Controller, Param, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/order/order.entity';
import { OrderProductsAdminService } from './order-products.admin.service';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products')
export class OrderProductsAdminController {
  constructor(
    private readonly orderProductsAdminService: OrderProductsAdminService,
  ) {}

  @Version('1')
  @Post(':id/deliver')
  @ApiOkResponse({
    type: Order,
  })
  async postOrderProductDeliver(@Param('id') id: number) {
    return await this.orderProductsAdminService.postOrderProductDeliver(id);
  }
}
