import { Controller, Param, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/order/order.entity';
import { UserId } from '@common/decorator/user-id.decorator';
import { OrderProductsAppService } from './order-products.app.service';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products')
export class OrderProductsAppController {
  constructor(
    private readonly orderProductsAppService: OrderProductsAppService,
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
    return await this.orderProductsAppService.postOrderProductConfirm({
      id,
      userId,
    });
  }
}
