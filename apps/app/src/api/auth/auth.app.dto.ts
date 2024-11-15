import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AppUser } from '@domain/app-user/app-user.entity';

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
