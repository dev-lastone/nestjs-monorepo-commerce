import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminUserRepo } from '@application/admin-user/admin-user.repo';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';
import { PostAuthAdminRequestDto } from '../../../../apps/admin/src/api/auth/auth.admin.dto';

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

  async signIn(dto: PostAuthAdminRequestDto) {
    const adminUser = await this.adminUserRepo.findOneByEmail(dto.email);

    if (!adminUser) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }

    await adminUser.user.password.compare(dto.password);

    return adminUser;
  }
}
