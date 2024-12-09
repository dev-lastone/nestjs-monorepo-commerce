import { PickType } from '@nestjs/swagger';
import { UserPasswordValidation } from '@common/decorator/user-password-validation.decorator';
import { User } from '@domain/user/user';

export class CreateUserDto extends PickType(User, ['name', 'email']) {
  @UserPasswordValidation()
  password: string;
}
