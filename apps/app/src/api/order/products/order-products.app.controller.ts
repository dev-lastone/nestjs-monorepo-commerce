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
import { PatchOrderProductAppReqDto } from './order-products.app.dto';
import { OrderProductsAppService } from './order-products.app.service';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products')
export class OrderProductsAppController {
  constructor(
    private readonly orderProductsAppService: OrderProductsAppService,
  ) {}

  @Version('1')
  @Patch(':id')
  @ApiOkResponse({
    type: Order,
  })
  patchOrderProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: PatchOrderProductAppReqDto,
  ) {
    return this.orderProductsAppService.patchOrderProduct(id, dto);
  }
}
