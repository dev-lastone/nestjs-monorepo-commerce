import { PickType } from '@nestjs/swagger';
import { UserPasswordValidation } from '@common/decorator/user-password-validation.decorator';
import { User } from '@domain/_vo/user';

export class PostAuthAdminSignUpReqDto extends PickType(User, [
  'name',
  'email',
]) {
  @UserPasswordValidation()
  password: string;
}

export class PostAuthAdminRequestDto extends PickType(User, ['email']) {
  @UserPasswordValidation()
  password: string;
}
