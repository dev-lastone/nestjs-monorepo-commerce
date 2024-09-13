import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminController } from './auth.admin.controller';
import { AuthAdminService } from './auth.admin.service';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

describe('AuthAdminController', () => {
  let authAdminController: AuthAdminController;
  let validationPipe: ValidationPipe;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthAdminController],
      providers: [
        {
          provide: AuthAdminService,
          useValue: {
            signIn: jest.fn().mockResolvedValue({ token: 'mockToken' }),
          },
        },
      ],
    }).compile();

    authAdminController = app.get<AuthAdminController>(AuthAdminController);

    validationPipe = new ValidationPipe();
  });

  describe('signIn', () => {
    describe('값 체크', () => {
      it('email 필수', async () => {
        const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
        postAuthAdminRequestDto.email = '';
        postAuthAdminRequestDto.password = '1234';

        await expect(
          validationPipe.transform(postAuthAdminRequestDto, {
            type: 'body',
            metatype: PostAuthAdminRequestDto,
          }),
        ).rejects.toThrow(BadRequestException);
      });

      it('password 필수', async () => {
        const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
        postAuthAdminRequestDto.email = 'test@test.com';
        postAuthAdminRequestDto.password = '';

        await expect(
          validationPipe.transform(postAuthAdminRequestDto, {
            type: 'body',
            metatype: PostAuthAdminRequestDto,
          }),
        ).rejects.toThrow(BadRequestException);
      });

      it('이메일 형식', async () => {
        const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
        postAuthAdminRequestDto.email = 'test.com';
        postAuthAdminRequestDto.password = '1234';

        await expect(
          validationPipe.transform(postAuthAdminRequestDto, {
            type: 'body',
            metatype: PostAuthAdminRequestDto,
          }),
        ).rejects.toThrow(BadRequestException);
      });
    });

    // it('잘못된 이메일', async () => {
    //   const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
    //   postAuthAdminRequestDto.email = 'invalid@test.com';
    //   postAuthAdminRequestDto.password = '1234';
    //
    //   await expect(() =>
    //     authAdminController.signIn(postAuthAdminRequestDto),
    //   ).rejects.toThrow(new UnauthorizedException());
    // });
    //
    // it('잘못된 패스워드', async () => {
    //   const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
    //   postAuthAdminRequestDto.email = 'test@test.com';
    //   postAuthAdminRequestDto.password = 'invalid';
    //
    //   await expect(() =>
    //     authAdminController.signIn(postAuthAdminRequestDto),
    //   ).rejects.toThrow(new UnauthorizedException());
    // });

    it('성공', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = 'test@test.com';
      postAuthAdminRequestDto.password = '1234';

      await expect(
        authAdminController.signIn(postAuthAdminRequestDto),
      ).resolves.toEqual({
        token: 'mockToken',
      });
    });
  });
});
