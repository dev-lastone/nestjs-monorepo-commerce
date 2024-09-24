import { PostAuthAdminRequestDto } from '../auth.admin.dto';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

describe('AuthAdminDto', () => {
  const validationPipe = new ValidationPipe();

  describe('PostAuthAdminRequestDto', () => {
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
});
