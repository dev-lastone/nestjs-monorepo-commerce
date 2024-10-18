import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { AdminUserRepo } from '@domain/admin-user/admin-user.repo';
import { AuthApplicationService } from '@application/auth/auth.application.service';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly authApplicationService: AuthApplicationService,
    private readonly adminUserRepo: AdminUserRepo,
  ) {}

  signIn(dto: PostAuthAdminRequestDto) {
    const { email, password } = dto;

    const user = this.adminUserRepo.findOneByEmail(email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    return this.authApplicationService.createToken(user);
  }
}
