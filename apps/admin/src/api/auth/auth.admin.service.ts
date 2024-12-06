import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PostAuthAdminRequestDto } from './auth.admin.dto';
import { AdminUserRepo } from '@application/admin-user/admin-user.repo';
import { AuthService } from '@application/auth/auth.service';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly authService: AuthService,
    private readonly adminUserRepo: AdminUserRepo,
  ) {}

  async signUp(dto: CreateUserDto) {
    const dupUserEmail = await this.adminUserRepo.findOneByEmail(dto.email);
    if (dupUserEmail) {
      throw new BadRequestException(ERROR_MESSAGES.DuplicateEmail);
    }

    const user = await AdminUser.create(dto);

    await this.adminUserRepo.save(user);

    return this.authService.createToken(user);
  }

  async signIn(dto: PostAuthAdminRequestDto) {
    const adminUser = await this.adminUserRepo.findOneByEmail(dto.email);

    if (!adminUser) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }

    await adminUser.user.password.compare(dto.password);

    return this.authService.createToken(adminUser);
  }
}
