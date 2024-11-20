import { PostAuthAdminRequestDto } from '../auth.admin.dto';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { adminUserStub } from '@domain/admin-user/__stub/admin-user.stub';

describe('AuthAdminDto', () => {
  const validationPipe = new ValidationPipe();

  describe('PostAuthAdminRequestDto', () => {
    it('email 필수', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = '';
      postAuthAdminRequestDto.password = adminUserStub.password;

      await _expect(postAuthAdminRequestDto);
    });

    it('이메일 형식', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = 'test.com';
      postAuthAdminRequestDto.password = adminUserStub.password;

      await _expect(postAuthAdminRequestDto);
    });
  });

  async function _expect(dto: PostAuthAdminRequestDto) {
    await expect(
      validationPipe.transform(dto, {
        type: 'body',
        metatype: PostAuthAdminRequestDto,
      }),
    ).rejects.toThrow(BadRequestException);
  }
});
