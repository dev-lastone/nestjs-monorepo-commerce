import { AppUser } from '@domain/app-user/app-user.entity';
import { UserName } from '@domain/_vo/user-name';

const appUser = {
  name: UserName.create('홍길동'),
  email: 'test@test.com',
  password: 'string1234',

  compare: async (password: string) => {},
} as AppUser;
appUser.id = 1;
export const appUserStub = appUser;

export const invalidAppUserStub = {
  email: 'invalid@test.come',
  password: 'invalid',
};
