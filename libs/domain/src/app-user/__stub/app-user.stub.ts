import { AppUser } from '@domain/app-user/app-user.entity';
import { UserName } from '@domain/_vo/user-name';
import { Email } from '@domain/_vo/email';

const appUser = {
  name: UserName.create('홍길동'),
  email: Email.create('test@test.com'),
  password: 'string1234',

  compare: async (password: string) => {},
} as AppUser;
appUser.id = 1;
export const appUserStub = appUser;

export const invalidAppUserStub = {
  email: Email.create('invalid@test.come'),
  password: 'invalid',
};
