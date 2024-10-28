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
import { UserId } from '@common/decorator/user-id.decorator';
import {
  PostUserAddressRequestDto,
  PutUserAddressRequestDto,
} from './user-addresses.app.dto';
import { UserAddress } from '../../../domain/user/address/user-address.entity';

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
  async postUserAddress(
    @UserId() userId: number,
    @Body() dto: PostUserAddressRequestDto,
  ) {
    return await this.userAppService.postUserAddress({ userId, ...dto });
  }

  @Version('1')
  @Get()
  async getUserAddresses(@UserId() userId: number) {
    return await this.userAppService.getUserAddresses(userId);
  }

  @Version('1')
  @Put(':id')
  @ApiResponse({
    type: UserAddress,
  })
  async putUserAddress(
    @UserId() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: PutUserAddressRequestDto,
  ) {
    return await this.userAppService.putUserAddress(id, userId, dto);
  }

  @Version('1')
  @Delete(':id')
  @HttpCode(204)
  async deleteUserAddress(
    @UserId() userId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.userAppService.deleteUserAddress(userId, id);
  }
}
