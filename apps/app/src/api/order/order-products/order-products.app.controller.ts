import { Controller, Param, ParseIntPipe, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/domain/order/order';
import { OrderService } from '@domain/domain/order/order.service';
import { UserId } from '@common/common/decorator/user-id.decorator';

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
  postOrderProductConfirm(
    @UserId() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.orderService.orderProductConfirm({ id, userId });
  }
}
