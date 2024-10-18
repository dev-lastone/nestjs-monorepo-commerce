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
import {
  PostUserCartsAppReqDto,
  PutUserCartsAppReqDto,
} from './user-carts.app.dto';
import { UserId } from '@common/decorator/user-id.decorator';
import { UserCart } from '../../../domain/user/cart/user-cart';
import { UserCartService } from '../../../domain/user/cart/user-cart.service';
import { DeleteUserCartDto } from '../../../domain/user/cart/user-cart.dto';

@ApiBearerAuth('jwt')
@ApiTags('user')
@Controller('user/carts')
export class UserCartsAppController {
  constructor(private readonly userCartService: UserCartService) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    type: UserCart,
  })
  postUserCart(@UserId() userId: number, @Body() dto: PostUserCartsAppReqDto) {
    return this.userCartService.createUserCart({
      userId,
      ...dto,
    });
  }

  @Version('1')
  @Get()
  getUserCarts(@UserId() userId: number) {
    return this.userCartService.getUserCarts(userId);
  }

  // TODO patch
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
    return this.userCartService.putUserCart({
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
    const dto = new DeleteUserCartDto();
    dto.userId = userId;
    dto.id = id;
    this.userCartService.deleteUserCart(dto);
  }
}
