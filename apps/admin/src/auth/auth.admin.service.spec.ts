import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminService } from './auth.admin.service';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { JwtService } from '@nestjs/jwt';

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
