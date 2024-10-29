import { AppUser } from '@domain/app-user/app-user.entity';

const appUser = {
  name: '홍길동',
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
