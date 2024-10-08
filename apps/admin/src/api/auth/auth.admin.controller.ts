import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@common/common/decorator/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Public()
  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    type: String,
  })
  signIn(@Body() dto: PostAuthAdminRequestDto) {
    return this.authAdminService.signIn(dto);
  }
}