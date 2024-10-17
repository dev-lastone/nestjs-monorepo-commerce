import { Controller, Param, ParseIntPipe, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/domain/order/order';
import { OrderService } from '@domain/domain/order/order.service';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products')
export class OrderProductsAppController {
  constructor(private readonly orderService: OrderService) {}

  @Version('1')
  @Post(':id/confirm')
  @ApiOkResponse({
    type: Order,
  })
  postOrderProductConfirm(@Param('id', new ParseIntPipe()) id: number) {
    return this.orderService.orderProductConfirm(id);
  }
}
