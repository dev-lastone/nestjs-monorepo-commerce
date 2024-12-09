import { userEmail, userName } from '@common/constant/example';
import { User } from '@domain/user/user';
import { userPasswordStub } from '../../_vo/_stub/user-password.stub';

export const userStub = {
  id: 1,
  name: userName,
  email: userEmail,
  password: userPasswordStub,
} as User;
