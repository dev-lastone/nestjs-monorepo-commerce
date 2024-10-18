import { Controller, Param, ParseIntPipe, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/domain/order/order';
import { UserId } from '@common/common/decorator/user-id.decorator';
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
  postOrderProductConfirm(
    @UserId() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.orderApplicationService.orderProductConfirm({ id, userId });
  }
}
