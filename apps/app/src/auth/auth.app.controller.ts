import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { PostAuthAppRequestDto } from './auth.app.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/common/decorator/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @Public()
  @Version('1')
  @Post()
  async signIn(@Body() dto: PostAuthAppRequestDto) {
    return await this.authAppService.signIn(dto);
  }
}
