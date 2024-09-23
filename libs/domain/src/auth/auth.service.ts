import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  createToken(payload: any) {
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');

    return jwt.sign(payload, secret, {
      expiresIn,
    });
  }
}
