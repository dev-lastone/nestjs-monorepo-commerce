import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserPassword } from '@domain/_vo/user-password';
import { AppUser } from '@domain/app-user/app-user.entity';

export class PostAuthSignUpAppReqDto extends PickType(AppUser, [
  'name',
  'email',
  'password',
]) {
  @ApiProperty()
  passwordConfirm: UserPassword;
}

export class PostAuthAppRequestDto extends PickType(AppUser, [
  'email',
  'password',
]) {}
