import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminUser } from '@domain/domain/admin/user';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { AuthService } from '@domain/domain/auth/auth.service';

@Injectable()
export class AuthAdminService {
  constructor(private readonly authService: AuthService) {}

  private adminUsers: AdminUser[] = [
    {
      id: 1,
      name: '홍길동',
      email: 'test@test.com',
      password: '1234',
    },
  ];

  signIn(dto: PostAuthAdminRequestDto) {
    const { email, password } = dto;

    const user = this.adminUsers.find((user) => user.email === email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    return this.authService.createToken(user);
  }
}
