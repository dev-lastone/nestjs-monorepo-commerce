import { UserPassword } from '@domain/_vo/user-password';

export const userPasswordStub = {
  getValue() {
    return 'string1234';
  },
  async compare(password: string) {},
} as UserPassword;

export const invalidUserPasswordStub = {
  getValue() {
    return 'invalid1234';
  },
  async compare(password: string) {},
} as UserPassword;
