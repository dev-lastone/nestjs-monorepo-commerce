import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAppService } from './user.app.service';

@ApiTags('user')
@Controller('user')
export class UserAppController {
  constructor(private readonly userAppService: UserAppService) {}
}
