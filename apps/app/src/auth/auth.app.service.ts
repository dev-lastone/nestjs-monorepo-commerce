import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@domain/domain/admin/user';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { PostAuthAppRequestDto } from './auth.app.dto';

@Injectable()
export class AuthAppService {
  constructor(private readonly configService: ConfigService) {}

  private users: User[] = [
    {
      id: 1,
      name: '홍길동',
      email: 'test@test.com',
      password: '1234',
    },
  ];

  async signIn(dto: PostAuthAppRequestDto) {
    const { email, password } = dto;

    const user = this.users.find((user) => user.email === email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, name: user.name };

    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');
    const token = jwt.sign(payload, secret, {
      expiresIn,
    });

    return {
      token,
    };
  }
}
