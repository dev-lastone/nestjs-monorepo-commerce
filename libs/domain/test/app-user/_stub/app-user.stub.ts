import { AppUser } from '@domain/app-user/app-user.entity';
import { userStub } from '../../../test/_vo/_stub/user.stub';
import { invalidUserPasswordStub } from '../../../test/_vo/_stub/user-password.stub';

const appUser = {
  id: 1,
  user: userStub,
} as AppUser;
export const appUserStub = appUser;

export const invalidAppUserStub = {
  email: 'invalid@test.come',
  password: invalidUserPasswordStub,
};
