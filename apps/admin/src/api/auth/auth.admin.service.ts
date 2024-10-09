import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { AuthService } from '@domain/domain/auth/auth.service';
import { AdminUser } from '@domain/domain/admin-user/admin-user';
import { adminUserStub } from '@domain/domain/user/__stub/admin-user.stub';

@Injectable()
export class AuthAdminService {
  constructor(private readonly authService: AuthService) {}

  private adminUsers: AdminUser[] = [adminUserStub];

  signIn(dto: PostAuthAdminRequestDto) {
    const { email, password } = dto;

    const user = this.adminUsers.find((user) => user.email === email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    return this.authService.createToken(user);
  }
}
