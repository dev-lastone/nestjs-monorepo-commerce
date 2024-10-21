import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PostAuthAppRequestDto, PostAuthSignUpAppReqDto } from './auth.app.dto';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AppUser } from '@domain/app-user/app-user.entity';
import { AppUserRepo } from '@domain/app-user/app-user.repo';
import { AuthApplicationService } from '@application/auth/auth.application.service';

@Injectable()
export class AuthAppService {
  constructor(
    private readonly authApplicationService: AuthApplicationService,
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

    return this.authApplicationService.createToken(user);
  }

  signIn(dto: PostAuthAppRequestDto) {
    const { email, password } = dto;

    const user = this.appUserRepo.findOneByEmail(email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    return this.authApplicationService.createToken(user);
  }
}
