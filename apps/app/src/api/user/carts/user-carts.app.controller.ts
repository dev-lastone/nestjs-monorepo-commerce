import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCartsAppService } from './user-carts.app.service';
import {
  PostUserCartsAppReqDto,
  PutUserCartsAppReqDto,
} from './user-carts.app.dto';
import { UserId } from '@common/common/decorator/user-id.decorator';
import { UserCart } from '../../../domain/user/user-cart';

@ApiBearerAuth('jwt')
@ApiTags('user')
@Controller('user/carts')
export class UserCartsAppController {
  constructor(private readonly userCartsAppService: UserCartsAppService) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    type: UserCart,
  })
  postUserCart(@UserId() userId: number, @Body() dto: PostUserCartsAppReqDto) {
    return this.userCartsAppService.postUserCart(userId, dto);
  }

  @Version('1')
  @Get()
  getUserCarts(@UserId() userId: number) {
    return this.userCartsAppService.getUserCarts(userId);
  }

  @Version('1')
  @Put(':id')
  @ApiResponse({
    type: UserCart,
  })
  putUserCart(
    @UserId() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: PutUserCartsAppReqDto,
  ) {
    return this.userCartsAppService.putUserCart({
      userId,
      id,
      ...dto,
    });
  }

  @Version('1')
  @Delete(':id')
  @HttpCode(204)
  deleteUserCart(
    @UserId() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    this.userCartsAppService.deleteUserCart({ userId, id });
  }
}
