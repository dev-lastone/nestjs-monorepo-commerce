import { ApiProperty, PickType } from '@nestjs/swagger';
import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { IsNotEmpty, Length } from 'class-validator';

export class PostAuthAdminSignUpReqDto extends PickType(AdminUser, [
  'name',
  'email',
]) {
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

export class PostAuthAdminRequestDto extends PickType(AdminUser, ['email']) {
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
