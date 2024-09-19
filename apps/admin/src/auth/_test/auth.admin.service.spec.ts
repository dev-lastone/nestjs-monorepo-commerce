import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminService } from '../auth.admin.service';
import { PostAuthAdminRequestDto } from '../auth.admin.dto';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

describe('AuthAdminService', () => {
  let authAdminService: AuthAdminService;
  let configService: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthAdminService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authAdminService = app.get<AuthAdminService>(AuthAdminService);
    configService = app.get<ConfigService>(ConfigService);
  });

  describe('signIn', () => {
    it('잘못된 이메일', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = 'invalid@test.com';
      postAuthAdminRequestDto.password = '1234';

      await expect(() =>
        authAdminService.signIn(postAuthAdminRequestDto),
      ).rejects.toThrow(new UnauthorizedException());
    });

    it('잘못된 패스워드', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = 'test@test.com';
      postAuthAdminRequestDto.password = 'invalid';

      await expect(() =>
        authAdminService.signIn(postAuthAdminRequestDto),
      ).rejects.toThrow(new UnauthorizedException());
    });

    it('성공', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = 'test@test.com';
      postAuthAdminRequestDto.password = '1234';

      jest.spyOn(configService, 'get').mockImplementation((key: string) => {
        if (key === 'JWT_SECRET') return 'test';
        if (key === 'JWT_EXPIRES_IN') return '60s';
      });

      const secret = configService.get('JWT_SECRET');
      const expiresIn = configService.get('JWT_EXPIRES_IN');

      jest.spyOn(jwt, 'sign').mockReturnValue('mockToken');

      const result = await authAdminService.signIn(postAuthAdminRequestDto);

      const payload = { sub: 1, email: 'test@test.com', name: '홍길동' };
      expect(jwt.sign).toHaveBeenCalledWith(payload, secret, {
        expiresIn,
      });

      expect(result).toEqual({
        token: 'mockToken',
      });
    });
  });
});
