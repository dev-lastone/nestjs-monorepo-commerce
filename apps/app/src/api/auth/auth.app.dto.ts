import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AppUser } from '@domain/domain/app-user/app-user';

export class PostAuthSignUpAppReqDto extends PickType(AppUser, [
  'name',
  'email',
  'password',
]) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  passwordConfirm!: string;
}

export class PostAuthAppRequestDto extends PickType(AppUser, [
  'email',
  'password',
]) {}
