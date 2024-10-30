import { Controller, Param, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/order/order.entity';
import { UserId } from '@common/decorator/user-id.decorator';
import { OrderApplicationService } from '@application/order/order.application.service';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products')
export class OrderProductsAppController {
  constructor(
    private readonly orderApplicationService: OrderApplicationService,
  ) {}

  @Version('1')
  @Post(':id/confirm')
  @ApiOkResponse({
    type: Order,
  })
  async postOrderProductConfirm(
    @UserId() userId: number,
    @Param('id') id: number,
  ) {
    return await this.orderApplicationService.orderProductConfirm({
      id,
      userId,
    });
  }
}
