import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PostAuthAppRequestDto, PostAuthSignUpAppReqDto } from './auth.app.dto';
import { AuthService } from '@domain/domain/auth/auth.service';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { AppUser } from '@domain/domain/user/app-user';
import { appUserStub } from '@domain/domain/user/__stub/app-user.stub';

@Injectable()
export class AuthAppService {
  constructor(private readonly authService: AuthService) {}

  private appUsers: AppUser[] = [appUserStub];

  signUp(dto: PostAuthSignUpAppReqDto) {
    if (dto.password !== dto.passwordConfirm) {
      throw new BadRequestException(ERROR_MESSAGES.PasswordConfirm);
    }

    const user = new AppUser();
    user.id = this.appUsers.length + 1;
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;

    this.appUsers.push(user);

    return this.authService.createToken(user);
  }

  signIn(dto: PostAuthAppRequestDto) {
    const { email, password } = dto;

    const user = this.appUsers.find((user) => user.email === email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    return this.authService.createToken(user);
  }
}
