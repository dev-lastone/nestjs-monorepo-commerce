import { Injectable } from '@nestjs/common';
import { AuthService } from '@application/auth/auth.service';
import { UserService } from '../../application/user/user.service';
import { CreateUserDto } from '@domain/user/dto/create-user.dto';
import { SignInUserDto } from '@domain/user/dto/sign-in-user.dto';

@Injectable()
export class AuthAppService {
  constructor(
    private readonly authService: AuthService,
    private readonly appUserService: UserService,
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
