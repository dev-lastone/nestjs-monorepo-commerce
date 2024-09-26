import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAppService } from './user.app.service';

@ApiBearerAuth('jwt')
@ApiTags('user')
@Controller('user')
export class UserAppController {
  constructor(private readonly userAppService: UserAppService) {}
}
