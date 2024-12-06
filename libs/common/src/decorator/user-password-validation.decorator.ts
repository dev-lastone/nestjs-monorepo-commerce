import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { userPassword } from '@common/constant/example';

export function UserPasswordValidation() {
  return applyDecorators(
    ApiProperty({
      example: userPassword,
      description: '비밀번호',
      minLength: 8,
      maxLength: 20,
    }),
    IsNotEmpty(),
    Length(8, 20),
  );
}
