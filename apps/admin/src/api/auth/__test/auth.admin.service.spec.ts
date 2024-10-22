import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminService } from '../auth.admin.service';
import { PostAuthAdminRequestDto } from '../auth.admin.dto';
import { UnauthorizedException } from '@nestjs/common';
import {
  adminUserStub,
  invalidAdminUserStub,
} from '@domain/admin-user/__stub/admin-user.stub';
import { AuthApplicationService } from '@application/auth/auth.application.service';
import { AdminUserRepo } from '@domain/admin-user/admin-user.repo';

describe('AuthAdminService', () => {
  let authAdminService: AuthAdminService;
  let authApplicationService: AuthApplicationService;
  let adminUserRepo: AdminUserRepo;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthAdminService,
        {
          provide: AuthApplicationService,
          useValue: {
            createToken: jest.fn(),
          },
        },
        {
          provide: AdminUserRepo,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authAdminService = app.get(AuthAdminService);
    authApplicationService = app.get(AuthApplicationService);
    adminUserRepo = app.get(AdminUserRepo);
  });

  describe('signIn', () => {
    it('잘못된 이메일', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = invalidAdminUserStub.email;
      postAuthAdminRequestDto.password = adminUserStub.password;

      expect(
        async () => await authAdminService.signIn(postAuthAdminRequestDto),
      ).rejects.toThrow(new UnauthorizedException());
    });

    it('잘못된 패스워드', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = adminUserStub.email;
      postAuthAdminRequestDto.password = invalidAdminUserStub.password;

      expect(async () =>
        authAdminService.signIn(postAuthAdminRequestDto),
      ).rejects.toThrow(new UnauthorizedException());
    });

    it('성공', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = adminUserStub.email;
      postAuthAdminRequestDto.password = adminUserStub.password;

      jest
        .spyOn(adminUserRepo, 'findOneByEmail')
        .mockResolvedValue(adminUserStub);

      jest
        .spyOn(authApplicationService, 'createToken')
        .mockReturnValue('mockToken');

      const result = await authAdminService.signIn(postAuthAdminRequestDto);

      expect(result).toEqual('mockToken');
    });
  });
});
