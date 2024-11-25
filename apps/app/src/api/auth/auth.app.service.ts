import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PostAuthAppRequestDto } from './auth.app.dto';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AppUser } from '@domain/app-user/app-user.entity';
import { AuthApplicationService } from '@application/auth/auth.application.service';
import { AppUserRepo } from '@domain/app-user/app-user.repo';
import { CreateUserDto } from '@domain/_dto/create-user.dto';

@Injectable()
export class AuthAppService {
  constructor(
    private readonly authApplicationService: AuthApplicationService,
    private readonly appUserRepo: AppUserRepo,
  ) {}

  async signUp(dto: CreateUserDto) {
    const dupUserEmail = await this.appUserRepo.findOneByEmail(dto.email);
    if (dupUserEmail) {
      throw new BadRequestException(ERROR_MESSAGES.DuplicateEmail);
    }

    const user = await AppUser.create(dto);

    await this.appUserRepo.save(user);

    return this.authApplicationService.createToken(user);
  }

  async signIn(dto: PostAuthAppRequestDto) {
    const appUser = await this.appUserRepo.findOneByEmail(dto.email);

    if (!appUser) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }

    await appUser.user.password.compare(dto.password);

    return this.authApplicationService.createToken(appUser);
  }
}
