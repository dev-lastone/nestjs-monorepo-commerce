import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PostAuthAppRequestDto, PostAuthSignUpAppReqDto } from './auth.app.dto';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AppUser } from '@domain/app-user/app-user.entity';
import { AuthApplicationService } from '@application/auth/auth.application.service';
import { AppUserRepo } from '@domain/app-user/app-user.repo';

@Injectable()
export class AuthAppService {
  constructor(
    private readonly authApplicationService: AuthApplicationService,
    private readonly appUserRepo: AppUserRepo,
  ) {}

  async signUp(dto: PostAuthSignUpAppReqDto) {
    // TODO 이메일 중복 체크

    if (dto.password !== dto.passwordConfirm) {
      throw new BadRequestException(ERROR_MESSAGES.PasswordConfirm);
    }

    const user = await AppUser.create(dto);

    await this.appUserRepo.save(user);

    return this.authApplicationService.createToken(user);
  }

  async signIn(dto: PostAuthAppRequestDto) {
    const user = await this.appUserRepo.findOneByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }

    await user.password.compare(dto.password);

    return this.authApplicationService.createToken(user);
  }
}
