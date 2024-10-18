import { PickType } from '@nestjs/swagger';
import { AdminUser } from '@domain/admin-user/admin-user';

export class PostAuthAdminRequestDto extends PickType(AdminUser, [
  'email',
  'password',
]) {}
