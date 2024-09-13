import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminController } from './auth.admin.controller';
import { AuthAdminService } from './auth.admin.service';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthAdminController', () => {
  let authAdminController: AuthAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthAdminController],
      providers: [AuthAdminService],
    }).compile();

    authAdminController = app.get<AuthAdminController>(AuthAdminController);
  });

  describe('signIn', () => {
    it('잘못된 이메일', () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = 'invalid@test.com';
      postAuthAdminRequestDto.password = '1234';

      expect(() => authAdminController.signIn(postAuthAdminRequestDto)).toThrow(
        new UnauthorizedException(),
      );
    });

    it('잘못된 패스워드', () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = 'test@test.com';
      postAuthAdminRequestDto.password = 'invalid';

      expect(() => authAdminController.signIn(postAuthAdminRequestDto)).toThrow(
        new UnauthorizedException(),
      );
    });

    it('성공', () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = 'test@test.com';
      postAuthAdminRequestDto.password = '1234';

      expect(authAdminController.signIn(postAuthAdminRequestDto)).toEqual({
        id: 1,
        name: '홍길동',
        ...postAuthAdminRequestDto,
      });
    });
  });
});
