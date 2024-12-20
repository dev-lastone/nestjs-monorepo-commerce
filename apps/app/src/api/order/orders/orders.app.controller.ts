import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersAppService } from './orders.app.service';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { UserId } from '@common/decorator/user-id.decorator';
import { Order } from '@domain/order/order.entity';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('orders')
export class OrdersAppController {
  constructor(private readonly ordersAppService: OrdersAppService) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    type: Order,
  })
  async postOrder(@UserId() userId: number, @Body() dto: PostOrdersAppReqDto) {
    return await this.ordersAppService.postOrder(userId, dto);
  }

  @Version('1')
  @Get()
  @ApiResponse({
    status: 200,
    type: [Order],
  })
  async getOrders(@UserId() userId: number) {
    return await this.ordersAppService.getOrders(userId);
  }
}
