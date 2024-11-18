import { ApiProperty, PickType } from '@nestjs/swagger';
import { AppUser } from '@domain/app-user/app-user.entity';
import { IsNotEmpty, Length } from 'class-validator';

export class PostAuthSignUpAppReqDto extends PickType(AppUser, [
  'name',
  'email',
]) {
  // TODO custom decorator 만들기
  // TODO 특문 조합 룰 추가
  @ApiProperty({
    example: 'string1234',
    description: '비밀번호',
    minLength: 8,
    maxLength: 20,
  })
  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @ApiProperty({
    example: 'string1234',
    description: '비밀번호',
    minLength: 8,
    maxLength: 20,
  })
  @IsNotEmpty()
  @Length(8, 20)
  passwordConfirm: string;
}

export class PostAuthAppRequestDto extends PickType(AppUser, ['email']) {
  @ApiProperty({
    example: 'string1234',
    description: '비밀번호',
    minLength: 8,
    maxLength: 20,
  })
  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
