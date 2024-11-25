import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorator/public.decorator';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';

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
  async signIn(@Body() dto: PostAuthAdminRequestDto) {
    return await this.authAdminService.signIn(dto);
  }
}
