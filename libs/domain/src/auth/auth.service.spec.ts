import { AuthService } from '@domain/domain/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';

describe('AuthService', () => {
  let authService: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    configService = app.get<ConfigService>(ConfigService);
  });

  it('createToken', () => {
    jest.spyOn(configService, 'get').mockImplementation((key: string) => {
      if (key === 'JWT_SECRET') return 'test';
      if (key === 'JWT_EXPIRES_IN') return '60s';
    });
    const secret = configService.get('JWT_SECRET');
    const expiresIn = configService.get('JWT_EXPIRES_IN');

    jest.spyOn(jwt, 'sign').mockReturnValue('mockToken');

    const payload = { sub: 1, email: 'test@test.com', name: '홍길동' };
    const result = authService.createToken(payload);

    expect(jwt.sign).toHaveBeenCalledWith(payload, secret, {
      expiresIn,
    });
    expect(result).toEqual('mockToken');
  });
});
