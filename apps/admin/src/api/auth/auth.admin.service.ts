import { Injectable } from '@nestjs/common';
import { AuthService } from '@application/auth/auth.service';
import { CreateUserDto } from '@domain/user/dto/create-user.dto';
import { SignInUserDto } from '@domain/user/dto/sign-in-user.dto';
import { AdminUserService } from '../../application/admin-user/admin-user.service';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly authService: AuthService,
    private readonly adminUserService: AdminUserService,
  ) {}

  async signUp(dto: CreateUserDto) {
    const user = await this.adminUserService.signUp(dto);
    return this.authService.createToken(user);
  }

  async signIn(dto: SignInUserDto) {
    const adminUser = await this.adminUserService.signIn(dto);
    return this.authService.createToken(adminUser);
  }
}
