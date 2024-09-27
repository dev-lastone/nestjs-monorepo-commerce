import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { AppUser } from '@domain/domain/app/user';
import { AdminUser } from '@domain/domain/admin/user';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  createToken(user: AdminUser | AppUser) {
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');

    const payload = { sub: user.id, email: user.email, name: user.name };

    return jwt.sign(payload, secret, {
      expiresIn,
    });
  }
}
