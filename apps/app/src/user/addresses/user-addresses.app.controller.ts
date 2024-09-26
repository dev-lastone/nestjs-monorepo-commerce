import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAddressesAppService } from './user-addresses.app.service';
import { UserId } from '@common/common/decorator/user-id.decorator';
import {
  PostUserAddressRequestDto,
  PutUserAddressRequestDto,
} from './user-addresses.app.dto';

@ApiBearerAuth('jwt')
@ApiTags('user')
@Controller('user/addresses')
export class UserAddressesAppController {
  constructor(private readonly userAppService: UserAddressesAppService) {}

  @Version('1')
  @Post()
  postUserAddress(
    @UserId() userId: number,
    @Body() dto: PostUserAddressRequestDto,
  ) {
    return this.userAppService.postUserAddress(userId, dto);
  }

  @Version('1')
  @Get()
  getUserAddresses(@UserId() userId: number) {
    return this.userAppService.getUserAddresses(userId);
  }

  @Version('1')
  @Put(':id')
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

  @Version('1')
  @Delete(':id')
  deleteUserAddress(
    @UserId() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.userAppService.deleteUserAddress(userId, id);
  }
}
