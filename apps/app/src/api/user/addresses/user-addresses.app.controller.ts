import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAddressesAppService } from './user-addresses.app.service';
import { UserId } from '@common/decorator/user-id.decorator';
import { UserAddressRequestDto } from './user-addresses.app.dto';
import { UserAddress } from '@domain/app-user/user-address.entity';

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
    @Body() dto: UserAddressRequestDto,
  ) {
    return await this.userAppService.postUserAddress({ userId, ...dto });
  }

  @Version('1')
  @Get()
  @ApiResponse({
    type: UserAddress,
    isArray: true,
  })
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
    @Param('id') id: number,
    @Body() dto: UserAddressRequestDto,
  ) {
    return await this.userAppService.putUserAddress({ id, userId, ...dto });
  }

  @Version('1')
  @Delete(':id')
  @HttpCode(204)
  async deleteUserAddress(@UserId() userId: number, @Param('id') id: number) {
    return await this.userAppService.deleteUserAddress(userId, id);
  }
}
