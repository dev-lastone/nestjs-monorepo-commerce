import { AppUser } from '@domain/app-user/app-user.entity';
import {
  invalidUserPasswordStub,
  userPasswordStub,
} from '@domain/_vo/__stub/user-password.stub';
import { User } from '@domain/_vo/user';

export const userStub = {
  name: '홍길동',
  email: 'test@test.com',
  password: userPasswordStub,
} as User;

const appUser = {
  id: 1,
  user: userStub,
} as AppUser;
export const appUserStub = appUser;

export const invalidAppUserStub = {
  email: 'invalid@test.come',
  password: invalidUserPasswordStub,
};
