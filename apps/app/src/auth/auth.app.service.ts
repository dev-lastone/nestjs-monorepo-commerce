import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PostAuthAppRequestDto } from './auth.app.dto';
import { AuthService } from '@domain/domain/auth/auth.service';
import { AppUser } from '@domain/domain/app/user';

@Injectable()
export class AuthAppService {
  constructor(private readonly authService: AuthService) {}

  private appUsers: AppUser[] = [
    {
      id: 1,
      name: '홍길동',
      email: 'test@test.com',
      password: '1234',
    },
  ];

  signIn(dto: PostAuthAppRequestDto) {
    const { email, password } = dto;

    const user = this.appUsers.find((user) => user.email === email);

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
