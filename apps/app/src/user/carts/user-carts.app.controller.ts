import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCartsAppService } from './user-carts.app.service';
import { PostUserCartsAppReqDto } from './user-carts.app.dto';
import { UserId } from '@common/common/decorator/user-id.decorator';
import { UserCart } from '@domain/domain/app/user-cart';

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
}
