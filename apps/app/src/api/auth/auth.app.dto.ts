import { ApiProperty, PickType } from '@nestjs/swagger';
import { AppUser } from '@domain/app-user/app-user.entity';
import { UserPassword } from '@domain/_vo/user-password';
import { Transform, Type } from 'class-transformer';
import { UserName } from '@domain/_vo/user-name';
import { Email } from '@domain/_vo/email';

export class PostAuthSignUpAppReqDto {
  @ApiProperty({
    example: '홍길동',
  })
  @Transform((v) => {
    return UserName.create(v.value);
  })
  name: UserName;

  @ApiProperty()
  @Type(() => Email)
  email: Email;

  @ApiProperty()
  @Type(() => UserPassword)
  password: UserPassword;

  @ApiProperty()
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
