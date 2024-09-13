import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Version('1')
  @Post()
  signIn(@Body() dto: PostAuthAdminRequestDto) {
    return this.authAdminService.signIn(dto);
  }
}
