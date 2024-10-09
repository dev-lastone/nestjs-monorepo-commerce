import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PostAuthAppRequestDto, PostAuthSignUpAppReqDto } from './auth.app.dto';
import { AuthService } from '@domain/domain/auth/auth.service';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { AppUser } from '@domain/domain/app-user/app-user';
import { AppUserRepo } from '@domain/domain/app-user/app-user.repo';

@Injectable()
export class AuthAppService {
  constructor(
    private readonly authService: AuthService,
    private readonly appUserRepo: AppUserRepo,
  ) {}

  signUp(dto: PostAuthSignUpAppReqDto) {
    if (dto.password !== dto.passwordConfirm) {
      throw new BadRequestException(ERROR_MESSAGES.PasswordConfirm);
    }

    const user = new AppUser();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;

    this.appUserRepo.save(user);

    return this.authService.createToken(user);
  }

  signIn(dto: PostAuthAppRequestDto) {
    const { email, password } = dto;

    const user = this.appUserRepo.findOneByEmail(email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    return this.authService.createToken(user);
  }
}
