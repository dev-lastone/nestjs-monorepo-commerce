import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@domain/domain/admin/user';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthAdminService {
  constructor(private readonly jwtService: JwtService) {}

  private users: User[] = [
    {
      id: 1,
      name: '홍길동',
      email: 'test@test.com',
      password: '1234',
    },
  ];

  async signIn(dto: PostAuthAdminRequestDto) {
    const { email, password } = dto;

    const user = this.users.find((user) => user.email === email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, name: user.name };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }
}
