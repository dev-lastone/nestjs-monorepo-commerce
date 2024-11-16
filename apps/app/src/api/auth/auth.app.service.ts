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

    if (dto.password.getValue() !== dto.passwordConfirm.getValue()) {
      throw new BadRequestException(ERROR_MESSAGES.PasswordConfirm);
    }

    const user = await AppUser.create(dto);

    await this.appUserRepo.save(user);

    return this.authApplicationService.createToken(user);
  }

  async signIn(dto: PostAuthAppRequestDto) {
    const { email, password } = dto;

    const user = await this.appUserRepo.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }

    await user.compare(password);

    return this.authApplicationService.createToken(user);
  }
}
