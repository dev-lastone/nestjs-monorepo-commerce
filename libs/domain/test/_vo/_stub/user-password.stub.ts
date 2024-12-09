import { UserPassword } from '@domain/_vo/user-password';

export const userPasswordStub = {
  async compare(password: string) {},
} as UserPassword;

export const invalidPasswordStub = 'invalidPassword';
