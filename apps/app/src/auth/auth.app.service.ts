import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@domain/domain/admin/user';
import { PostAuthAppRequestDto } from './auth.app.dto';
import { AuthService } from '@domain/domain/auth/auth.service';

@Injectable()
export class AuthAppService {
  constructor(private readonly authService: AuthService) {}

  private users: User[] = [
    {
      id: 1,
      name: '홍길동',
      email: 'test@test.com',
      password: '1234',
    },
  ];

  signIn(dto: PostAuthAppRequestDto) {
    const { email, password } = dto;

    const user = this.users.find((user) => user.email === email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, name: user.name };

    const token = this.authService.createToken(payload);

    return {
      token,
    };
  }
}
