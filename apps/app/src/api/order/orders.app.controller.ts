import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersAppService } from './orders.app.service';
import { PostOrdersAppReqDto } from './orders.app.dto';
import { UserId } from '@common/common/decorator/user-id.decorator';

@ApiTags('orders')
@Controller('orders')
export class OrdersAppController {
  constructor(private readonly ordersAppService: OrdersAppService) {}

  @Version('1')
  @Post()
  postOrder(@UserId() userId, @Body() dto: PostOrdersAppReqDto) {
    return this.ordersAppService.postOrder(userId, dto);
  }
}
