import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorator/public.decorator';
import { CreateUserDto } from '@domain/user/dto/create-user.dto';
import { SignInUserDto } from '@domain/user/dto/sign-in-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Public()
  @Version('1')
  @Post('sign-up')
  @ApiResponse({
    status: 201,
    type: String,
  })
  async signUp(@Body() dto: CreateUserDto) {
    return await this.authAdminService.signUp(dto);
  }

  @Public()
  @Version('1')
  @Post('signIn')
  @ApiResponse({
    status: 201,
    type: String,
  })
  async signIn(@Body() dto: SignInUserDto) {
    return await this.authAdminService.signIn(dto);
  }
}
