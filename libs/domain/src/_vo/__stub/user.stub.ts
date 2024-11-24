import { userPasswordStub } from '@domain/_vo/__stub/user-password.stub';
import { User } from '@domain/_vo/user';

export const userStub = {
  name: '홍길동',
  email: 'test@test.com',
  password: userPasswordStub,
} as User;
