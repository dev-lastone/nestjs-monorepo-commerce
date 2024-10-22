import { PickType } from '@nestjs/swagger';
import { AdminUser } from '@domain/admin-user/admin-user.entity';

export class PostAuthAdminRequestDto extends PickType(AdminUser, [
  'email',
  'password',
]) {}
