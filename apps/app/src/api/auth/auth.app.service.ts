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
    if (dto.password !== dto.passwordConfirm) {
      throw new BadRequestException(ERROR_MESSAGES.PasswordConfirm);
    }

    const user = AppUser.create(dto);
    user.password = await AppUser.hashPassword(dto.password);

    await this.appUserRepo.save(user);

    return this.authApplicationService.createToken(user);
  }

  async signIn(dto: PostAuthAppRequestDto) {
    const { email, password } = dto;

    const user = await this.appUserRepo.findOneByEmail(email);

    const isPasswordValid = await user.compare(password, user.password);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }

    return this.authApplicationService.createToken(user);
  }
}
