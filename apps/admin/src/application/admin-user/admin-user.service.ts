import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { CreateUserDto } from '@domain/user/dto/create-user.dto';
import { SignInUserDto } from '@domain/user/dto/sign-in-user.dto';
import { AdminUserRepo } from './admin-user.repo';
import { AdminUser } from '../../domain/admin-user/admin-user.entity';

@Injectable()
export class AdminUserService {
  constructor(private readonly adminUserRepo: AdminUserRepo) {}

  async signUp(dto: CreateUserDto) {
    const dupUserEmail = await this.adminUserRepo.findOneByEmail(dto.email);
    if (dupUserEmail) {
      throw new BadRequestException(ERROR_MESSAGES.DuplicateEmail);
    }

    const user = await AdminUser.create(dto);

    return await this.adminUserRepo.save(user);
  }

  async signIn(dto: SignInUserDto) {
    const adminUser = await this.adminUserRepo.findOneByEmail(dto.email);

    if (!adminUser) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }

    await adminUser.password.compare(dto.password);

    return adminUser;
  }
}
