import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '@application/auth/auth.service';
import { createUserDtoStub } from '../../../domain/test/user/stub/dto/create-user.dto.stub';
import { User } from '@domain/user/user';

describe('AuthService', () => {
  let authService: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
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

    authService = testingModule.get(AuthService);
    configService = testingModule.get(ConfigService);
  });

  it('createToken', async () => {
    jest.spyOn(configService, 'get').mockImplementation((key: string) => {
      if (key === 'JWT_SECRET') return 'test';
      if (key === 'JWT_EXPIRES_IN') return '60s';
    });
    const secret = configService.get('JWT_SECRET');
    const expiresIn = configService.get('JWT_EXPIRES_IN');

    jest.spyOn(jwt, 'sign').mockReturnValue('mockToken');

    const user = await User.create(createUserDtoStub);
    const result = authService.createToken(user);

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
