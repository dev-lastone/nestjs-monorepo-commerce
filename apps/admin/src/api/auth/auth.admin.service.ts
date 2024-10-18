import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { AuthService } from '@domain/auth/auth.service';
import { AdminUserRepo } from '@domain/admin-user/admin-user.repo';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly authService: AuthService,
    private readonly adminUserRepo: AdminUserRepo,
  ) {}

  signIn(dto: PostAuthAdminRequestDto) {
    const { email, password } = dto;

    const user = this.adminUserRepo.findOneByEmail(email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    return this.authService.createToken(user);
  }
}
