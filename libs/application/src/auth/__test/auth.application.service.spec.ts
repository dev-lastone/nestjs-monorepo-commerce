import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { adminUserStub } from '@domain/admin-user/__stub/admin-user.stub';
import { AuthApplicationService } from '@application/auth/auth.application.service';

describe('AuthService', () => {
  let authApplicationService: AuthApplicationService;
  let configService: ConfigService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        AuthApplicationService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authApplicationService = testingModule.get(AuthApplicationService);
    configService = testingModule.get(ConfigService);
  });

  it('createToken', () => {
    jest.spyOn(configService, 'get').mockImplementation((key: string) => {
      if (key === 'JWT_SECRET') return 'test';
      if (key === 'JWT_EXPIRES_IN') return '60s';
    });
    const secret = configService.get('JWT_SECRET');
    const expiresIn = configService.get('JWT_EXPIRES_IN');

    jest.spyOn(jwt, 'sign').mockReturnValue('mockToken');

    const user = new AdminUser();
    user.id = adminUserStub.id;
    user.name = adminUserStub.name;
    user.email = adminUserStub.email;
    const result = authApplicationService.createToken(user);

    expect(jwt.sign).toHaveBeenCalledWith(
      { sub: user.id, email: user.email, name: user.name },
      secret,
      {
        expiresIn,
      },
    );
    expect(result).toEqual('mockToken');
  });
});
