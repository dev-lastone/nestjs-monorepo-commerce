import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  PostAuthAdminRequestDto,
  PostAuthAdminSignUpReqDto,
} from './auth.admin.dto';
import { AdminUserRepo } from '@domain/admin-user/admin-user.repo';
import { AuthApplicationService } from '@application/auth/auth.application.service';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AdminUser } from '@domain/admin-user/admin-user.entity';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly authApplicationService: AuthApplicationService,
    private readonly adminUserRepo: AdminUserRepo,
  ) {}

  async signUp(dto: PostAuthAdminSignUpReqDto) {
    const dupUserEmail = await this.adminUserRepo.findOne({ email: dto.email });
    if (dupUserEmail) {
      throw new BadRequestException(ERROR_MESSAGES.DuplicateEmail);
    }

    const user = await AdminUser.create(dto);

    await this.adminUserRepo.save(user);

    return this.authApplicationService.createToken(user);
  }

  async signIn(dto: PostAuthAdminRequestDto) {
    const user = await this.adminUserRepo.findOne({
      email: dto.email,
    });

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }

    await user.password.compare(dto.password);

    return this.authApplicationService.createToken(user);
  }
}
