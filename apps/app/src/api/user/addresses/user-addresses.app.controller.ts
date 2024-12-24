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
import { UserAddressRequestDto } from '../../../application/user/address/user-address.dto';
import { AppUserAddress } from '@domain/app-user/app-user-address.entity';

@ApiBearerAuth('jwt')
@ApiTags('user')
@Controller('user/addresses')
export class UserAddressesAppController {
  constructor(private readonly userAppService: UserAddressesAppService) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    type: AppUserAddress,
  })
  async postUserAddress(
    @UserId() userId: bigint,
    @Body() dto: UserAddressRequestDto,
  ) {
    return await this.userAppService.postUserAddress({ userId, ...dto });
  }

  @Version('1')
  @Get()
  @ApiResponse({
    type: AppUserAddress,
    isArray: true,
  })
  async getUserAddresses(@UserId() userId: bigint) {
    return await this.userAppService.getUserAddresses(userId);
  }

  @Version('1')
  @Put(':id')
  @ApiResponse({
    type: AppUserAddress,
  })
  async putUserAddress(
    @UserId() userId: bigint,
    @Param('id') id: bigint,
    @Body() dto: UserAddressRequestDto,
  ) {
    return await this.userAppService.putUserAddress({ id, userId, ...dto });
  }

  @Version('1')
  @Delete(':id')
  @HttpCode(204)
  async deleteUserAddress(@UserId() userId: bigint, @Param('id') id: bigint) {
    return await this.userAppService.deleteUserAddress({ userId, id });
  }
}
