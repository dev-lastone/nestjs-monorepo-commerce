import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAppService } from './user.app.service';
import { UserId } from '@common/common/decorator/user-id.decorator';
import {
  PostUserAddressRequestDto,
  PutUserAddressRequestDto,
} from './user.app.dto';

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

  @Version('1')
  @Put('addresses/:id')
  putUserAddress(
    @UserId() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: PutUserAddressRequestDto,
  ) {
    return this.userAppService.putUserAddress({
      id,
      userId,
      ...dto,
    });
  }
}
