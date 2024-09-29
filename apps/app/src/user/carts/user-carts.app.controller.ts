import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserCartsAppService } from './user-carts.app.service';
import { Public } from '@common/common/decorator/public.decorator';
import { PostUserCartsAppReqDto } from './user-carts.app.dto';
import { UserId } from '@common/common/decorator/user-id.decorator';

@ApiBearerAuth('jwt')
@ApiTags('user')
@Controller('user/carts')
export class UserCartsAppController {
  constructor(private readonly userCartsAppService: UserCartsAppService) {}

  @Public()
  @Version('1')
  @Post()
  postUserCart(@UserId() userId: number, @Body() dto: PostUserCartsAppReqDto) {
    return this.userCartsAppService.postUserCart(userId, dto);
  }
}
