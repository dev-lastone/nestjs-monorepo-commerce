import { AppUser } from '@domain/app-user/app-user.entity';
import { invalidUserPasswordStub } from '@domain/_vo/__stub/user-password.stub';
import { userStub } from '@domain/_vo/__stub/user.stub';

const appUser = {
  id: 1,
  user: userStub,
} as AppUser;
export const appUserStub = appUser;

export const invalidAppUserStub = {
  email: 'invalid@test.come',
  password: invalidUserPasswordStub,
};
