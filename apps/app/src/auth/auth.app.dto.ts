import { PickType } from '@nestjs/swagger';
import { AppUser } from '@domain/domain/app/user';

export class PostAuthAppRequestDto extends PickType(AppUser, [
  'email',
  'password',
]) {}
