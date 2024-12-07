import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { AdminUserRepo } from '@application/admin-user/admin-user.repo';
import { AuthService } from '@application/auth/auth.service';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';
import { AdminUserService } from '@application/admin-user/admin-user.service';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly authService: AuthService,
    private readonly adminUserService: AdminUserService,
    private readonly adminUserRepo: AdminUserRepo,
  ) {}

  async signUp(dto: CreateUserDto) {
    const user = await this.adminUserService.signUp(dto);
    return this.authService.createToken(user);
  }

  async signIn(dto: PostAuthAdminRequestDto) {
    const adminUser = await this.adminUserRepo.findOneByEmail(dto.email);

    if (!adminUser) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }

    await adminUser.user.password.compare(dto.password);

    return this.authService.createToken(adminUser);
  }
}
