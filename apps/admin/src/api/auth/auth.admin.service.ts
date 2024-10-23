import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { AdminUserRepo } from '@domain/admin-user/admin-user.repo';
import { AuthApplicationService } from '@application/auth/auth.application.service';
import { ERROR_MESSAGES } from '@common/constant/error-messages';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly authApplicationService: AuthApplicationService,
    private readonly adminUserRepo: AdminUserRepo,
  ) {}

  async signIn(dto: PostAuthAdminRequestDto) {
    const { email, password } = dto;

    const user = await this.adminUserRepo.findOne({
      email,
    });

    if (!user || password !== user.password) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }

    return this.authApplicationService.createToken(user);
  }
}
