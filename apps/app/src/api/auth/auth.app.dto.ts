import { PickType } from '@nestjs/swagger';
import { User } from '@domain/_vo/user';
import { UserPasswordValidation } from '@common/decorator/user-password-validation.decorator';

export class PostAuthAppRequestDto extends PickType(User, ['email']) {
  @UserPasswordValidation()
  password: string;
}
