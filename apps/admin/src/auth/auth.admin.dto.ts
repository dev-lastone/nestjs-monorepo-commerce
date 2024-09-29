import { PickType } from '@nestjs/swagger';
import { AdminUser } from '@domain/domain/user/admin-user';

export class PostAuthAdminRequestDto extends PickType(AdminUser, [
  'email',
  'password',
]) {}
