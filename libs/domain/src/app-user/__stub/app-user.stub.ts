import { AppUser } from '@domain/app-user/app-user.entity';
import { UserPassword } from '@domain/_vo/user-password';

const userPassword = {
  getValue() {
    return 'string1234';
  },
  async compare(password: UserPassword) {},
} as UserPassword;

const appUser = {
  id: 1,
  name: '홍길동',
  email: 'test@test.com',
  password: userPassword,
} as AppUser;
export const appUserStub = appUser;

const invalidUserPassword = {
  getValue() {
    return 'invalid1234';
  },
  async compare(password: UserPassword) {},
} as UserPassword;

export const invalidAppUserStub = {
  email: 'invalid@test.come',
  password: invalidUserPassword,
};
