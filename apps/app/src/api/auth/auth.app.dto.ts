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
    return new UserName(v.value, { httpStatus: 400 });
  })
  name: UserName;

  @ApiProperty({
    example: 'test@test.com',
  })
  @Transform((v) => {
    return new Email(v.value, { httpStatus: 400 });
  })
  email: Email;

  @ApiProperty({
    example: 'test@test.com',
  })
  @Transform((v) => {
    return new Email(v.value, { httpStatus: 400 });
  })
  password: UserPassword;

  @ApiProperty({
    example: 'string12345',
  })
  @Transform((v) => {
    return new UserPassword(v.value, { httpStatus: 400 });
  })
  passwordConfirm!: UserPassword;
}

export class PostAuthAppRequestDto extends PickType(AppUser, [
  'email',
  'password',
]) {
  @Type(() => UserPassword)
  password: UserPassword;
}
