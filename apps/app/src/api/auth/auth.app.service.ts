import { Injectable } from '@nestjs/common';
import { AuthService } from '@application/auth/auth.service';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';
import { AppUserService } from '@application/app-user/app-user.service';
import { SignInUserDto } from '@domain/_vo/dto/sign-in-user.dto';

@Injectable()
export class AuthAppService {
  constructor(
    private readonly authService: AuthService,
    private readonly appUserService: AppUserService,
  ) {}

  async signUp(dto: CreateUserDto) {
    const user = await this.appUserService.signUp(dto);

    return this.authService.createToken(user);
  }

  async signIn(dto: SignInUserDto) {
    const appUser = await this.appUserService.signIn(dto);

    return this.authService.createToken(appUser);
  }
}
