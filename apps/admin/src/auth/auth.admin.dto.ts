import { PickType } from '@nestjs/swagger';
import { User } from '@domain/domain/admin/user';

export class PostAuthAdminRequestDto extends PickType(User, [
  'email',
  'password',
]) {}
