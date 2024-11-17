import { AppUser } from '@domain/app-user/app-user.entity';
import { UserName } from '@domain/_vo/user-name';
import { Email } from '@domain/_vo/email';
import { UserPassword } from '@domain/_vo/user-password';

const appUser = {
  name: UserName.create('홍길동'),
  email: Email.create('test@test.com'),
  password: new UserPassword('string1234'),

  compare: async (password: UserPassword) => {},
} as AppUser;
appUser.id = 1;
export const appUserStub = appUser;

export const invalidAppUserStub = {
  email: Email.create('invalid@test.come'),
  password: new UserPassword('invalid1234'),
};
