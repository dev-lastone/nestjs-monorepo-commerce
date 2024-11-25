import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { PostAuthAppRequestDto } from './auth.app.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorator/public.decorator';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @Public()
  @Version('1')
  @Post('sign-up')
  @ApiResponse({
    status: 201,
    type: String,
  })
  async signUp(@Body() dto: CreateUserDto) {
    return await this.authAppService.signUp(dto);
  }

  @Public()
  @Version('1')
  @Post('sign-in')
  @ApiResponse({
    status: 201,
    type: String,
  })
  async signIn(@Body() dto: PostAuthAppRequestDto) {
    return await this.authAppService.signIn(dto);
  }
}
