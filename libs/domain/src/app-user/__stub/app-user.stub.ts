import { AppUser } from '@domain/app-user/app-user.entity';
import {
  invalidUserPasswordStub,
  userPasswordStub,
} from '@domain/_vo/__stub/user-password.stub';

const appUser = {
  id: 1,
  name: '홍길동',
  email: 'test@test.com',
  password: userPasswordStub,
} as AppUser;
export const appUserStub = appUser;

export const invalidAppUserStub = {
  email: 'invalid@test.come',
  password: invalidUserPasswordStub,
};
