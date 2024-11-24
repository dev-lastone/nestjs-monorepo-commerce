import { PickType } from '@nestjs/swagger';
import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { UserPasswordValidation } from '@common/decorator/user-password-validation.decorator';

export class PostAuthAdminSignUpReqDto extends PickType(AdminUser, [
  'name',
  'email',
]) {
  @UserPasswordValidation()
  password: string;
}

export class PostAuthAdminRequestDto extends PickType(AdminUser, ['email']) {
  @UserPasswordValidation()
  password: string;
}
