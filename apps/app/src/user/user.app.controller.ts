import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAppService } from './user.app.service';
import { UserId } from '@common/common/decorator/user-id.decorator';
import { PostUserAddressRequestDto } from './user.app.dto';

@ApiBearerAuth('jwt')
@ApiTags('user')
@Controller('user')
export class UserAppController {
  constructor(private readonly userAppService: UserAppService) {}

  @Version('1')
  @Post('addresses')
  postUserAddress(
    @UserId() userId: number,
    @Body() dto: PostUserAddressRequestDto,
  ) {
    return this.userAppService.postUserAddress(userId, dto);
  }
}
