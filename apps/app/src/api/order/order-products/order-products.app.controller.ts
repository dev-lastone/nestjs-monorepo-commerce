import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@domain/domain/order/order';
import { OrderService } from '@domain/domain/order/order.service';
import { PatchOrderProductDto } from '@domain/domain/order/order.dto';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products')
export class OrderProductsAppController {
  constructor(private readonly orderService: OrderService) {}

  @Version('1')
  @Patch(':id')
  @ApiOkResponse({
    type: Order,
  })
  patchOrderProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: PatchOrderProductDto,
  ) {
    return this.orderService.patchOrderProduct(id, dto);
  }
}
