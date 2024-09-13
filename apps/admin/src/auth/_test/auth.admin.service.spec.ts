import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminService } from '../auth.admin.service';
import { PostAuthAdminRequestDto } from '../auth.admin.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthAdminService', () => {
  let authAdminService: AuthAdminService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthAdminService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authAdminService = app.get<AuthAdminService>(AuthAdminService);
    jwtService = app.get<JwtService>(JwtService);
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

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mockToken');

      const result = await authAdminService.signIn(postAuthAdminRequestDto);

      const payload = { sub: 1, email: 'test@test.com', name: '홍길동' };
      expect(jwtService.signAsync).toHaveBeenCalledWith(payload);

      expect(result).toEqual({
        token: 'mockToken',
      });
    });
  });
});
