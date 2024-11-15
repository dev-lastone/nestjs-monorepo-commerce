import { ApiProperty, PickType } from '@nestjs/swagger';
import { AppUser } from '@domain/app-user/app-user.entity';
import { UserPassword } from '@domain/_vo/user-password';
import { Type } from 'class-transformer';
import { UserName } from '@domain/_vo/user-name';
import { Email } from '@domain/_vo/email';
import { ValidateNested } from 'class-validator';

export class PostAuthSignUpAppReqDto extends PickType(AppUser, [
  'name',
  'email',
  'password',
]) {
  @ValidateNested()
  @Type(() => UserName)
  name: UserName;
  @ValidateNested()
  @Type(() => Email)
  email: Email;
  @ValidateNested()
  @Type(() => UserPassword)
  password: UserPassword;
  @ApiProperty()
  @ValidateNested()
  @Type(() => UserPassword)
  passwordConfirm!: UserPassword;
}

export class PostAuthAppRequestDto extends PickType(AppUser, [
  'email',
  'password',
]) {
  @Type(() => UserPassword)
  password: UserPassword;
}
