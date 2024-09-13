import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@domain/domain/admin/user';
import { PostAuthAdminRequestDto } from './auth.admin.dto';

@Injectable()
export class AuthAdminService {
  constructor() {}

  private users: User[] = [
    {
      id: 1,
      name: '홍길동',
      email: 'test@test.com',
      password: '1234',
    },
  ];

  signIn(dto: PostAuthAdminRequestDto) {
    const { email, password } = dto;

    const user = this.users.find((user) => user.email === email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
