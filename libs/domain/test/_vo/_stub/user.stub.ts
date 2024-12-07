import { userPasswordStub } from './user-password.stub';
import { User } from '@domain/_vo/user';
import { userEmail, userName } from '@common/constant/example';

export const userStub = {
  name: userName,
  email: userEmail,
  password: userPasswordStub,
} as User;
