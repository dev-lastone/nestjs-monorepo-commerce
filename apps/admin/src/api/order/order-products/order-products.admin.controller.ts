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
import { PatchOrderProductAdminReqDto } from './order-products.admin.dto';
import { OrderProductsAdminService } from './order-products.admin.service';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products')
export class OrderProductsAdminController {
  constructor(
    private readonly orderProductsAdminService: OrderProductsAdminService,
  ) {}

  @Version('1')
  @Patch(':id')
  @ApiOkResponse({
    type: Order,
  })
  patchOrderProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: PatchOrderProductAdminReqDto,
  ) {
    return this.orderProductsAdminService.patchOrderProduct(id, dto);
  }
}
