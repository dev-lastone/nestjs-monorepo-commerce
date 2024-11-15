import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { AppUser } from '@domain/app-user/app-user.entity';
import { UserName } from '@domain/_vo/user-name';
import { Transform } from 'class-transformer';

export class PostAuthSignUpAppReqDtoV1 {
  @ApiProperty({
    type: String,
    example: '홍길동',
  })
  @ValidateNested()
  @Transform((value) => UserName.create(value.value))
  name: UserName;
  @ApiProperty({
    example: 'test@test.com',
  })
  email: string;
  @ApiProperty({
    example: 'string1234',
  })
  password: string;
  @ApiProperty({
    example: 'string1234',
  })
  @IsNotEmpty()
  @IsString()
  passwordConfirm!: string;
}

export class PostAuthSignUpAppReqDto extends PickType(AppUser, [
  'name',
  'email',
  'password',
]) {
  @ApiProperty({
    example: 'string1234',
  })
  @IsNotEmpty()
  @IsString()
  passwordConfirm!: string;
}

export class PostAuthAppRequestDto extends PickType(AppUser, [
  'email',
  'password',
]) {}
