import { PickType } from '@nestjs/swagger';
import { UserPasswordValidation } from '@common/decorator/user-password-validation.decorator';
import { User } from '@domain/user/user';

export class SignInUserDto extends PickType(User, ['email']) {
  @UserPasswordValidation()
  password: string;
}
