import { Controller, Param, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/order/order.entity';
import { UserId } from '@common/decorator/user-id.decorator';
import { OrderService } from '@application/order/order.service';

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
  async postOrderProductConfirm(
    @UserId() userId: bigint,
    @Param('id') id: bigint,
  ) {
    return await this.orderService.orderProductConfirm({
      id,
      userId,
    });
  }
}
