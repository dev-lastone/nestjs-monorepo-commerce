import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';
import { AppUserRepo } from '@application/app-user/app-user.repo';
import { AppUser } from '@domain/app-user/app-user.entity';
import { SignInUserDto } from '@domain/_vo/dto/sign-in-user.dto';

@Injectable()
export class AppUserService {
  constructor(private readonly appUserRepo: AppUserRepo) {}

  async signUp(dto: CreateUserDto) {
    const dupUserEmail = await this.appUserRepo.findOneByEmail(dto.email);
    if (dupUserEmail) {
      throw new BadRequestException(ERROR_MESSAGES.DuplicateEmail);
    }

    const user = await AppUser.create(dto);

    return await this.appUserRepo.save(user);
  }

  async signIn(dto: SignInUserDto) {
    const appUser = await this.appUserRepo.findOneByEmail(dto.email);

    if (!appUser) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }

    await appUser.user.password.compare(dto.password);

    return appUser;
  }
}
