import { ApiProperty } from '@nestjs/swagger';
import { UserPassword } from '@domain/_vo/user-password';
import { Transform } from 'class-transformer';
import { UserName } from '@domain/_vo/user-name';
import { Email } from '@domain/_vo/email';

export class PostAuthSignUpAppReqDto {
  @ApiProperty({
    example: '홍길동',
  })
  @Transform((v) => {
    return UserName.create(v.value, { httpStatus: 400 });
  })
  name: UserName;

  @ApiProperty({
    example: 'test@test.com',
  })
  @Transform((v) => {
    return Email.create(v.value, { httpStatus: 400 });
  })
  email: Email;

  @ApiProperty({
    example: 'string1234',
  })
  @Transform((v) => {
    return UserPassword.create(v.value, { httpStatus: 400 });
  })
  password: UserPassword;

  @ApiProperty({
    example: 'string1234',
  })
  @Transform((v) => {
    return UserPassword.create(v.value, { httpStatus: 400 });
  })
  passwordConfirm!: UserPassword;
}

export class PostAuthAppRequestDto {
  @ApiProperty({
    example: 'test@test.com',
  })
  @Transform((v) => {
    return Email.create(v.value, { httpStatus: 400 });
  })
  email: Email;

  @ApiProperty({
    example: 'string1234',
  })
  @Transform(async (v) => {
    return await UserPassword.create(v.value, { httpStatus: 400 });
  })
  password: UserPassword;
}
