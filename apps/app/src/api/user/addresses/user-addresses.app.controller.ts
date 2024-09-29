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
import { UserAddressesAppService } from './user-addresses.app.service';
import { UserId } from '@common/common/decorator/user-id.decorator';
import {
  PostUserAddressRequestDto,
  PutUserAddressRequestDto,
} from './user-addresses.app.dto';
import { UserAddress } from '../../../domain/user/user-address';

@ApiBearerAuth('jwt')
@ApiTags('user')
@Controller('user/addresses')
export class UserAddressesAppController {
  constructor(private readonly userAppService: UserAddressesAppService) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    type: UserAddress,
  })
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
  @ApiResponse({
    type: UserAddress,
  })
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
  @HttpCode(204)
  deleteUserAddress(
    @UserId() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.userAppService.deleteUserAddress(userId, id);
  }
}
