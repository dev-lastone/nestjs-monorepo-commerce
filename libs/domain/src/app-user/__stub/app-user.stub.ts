import { AppUser } from '@domain/app-user/app-user.entity';

const appUser = AppUser.create({
  name: '홍길동',
  email: 'test@test.com',
  password: '1234',
});
appUser.id = 1;
export const appUserStub = appUser;

export const invalidAppUserStub = {
  email: 'invalid@test.come',
  password: 'invalid',
};
