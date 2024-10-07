import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersAppService } from './orders.app.service';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { UserId } from '@common/common/decorator/user-id.decorator';
import { Order } from '@domain/domain/order/order';

@ApiTags('orders')
@Controller('orders')
export class OrdersAppController {
  constructor(private readonly ordersAppService: OrdersAppService) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    type: Order,
  })
  postOrder(@UserId() userId: number, @Body() dto: PostOrdersAppReqDto) {
    return this.ordersAppService.postOrder(userId, dto);
  }

  @Version('1')
  @Get()
  @ApiResponse({
    status: 200,
    type: [Order],
  })
  getOrders(@UserId() userId: number) {
    return this.ordersAppService.getOrders(userId);
  }
}
