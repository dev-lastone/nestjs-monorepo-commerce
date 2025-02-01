import { userEmail, userName } from '@common/constant/example';
import { User } from '@domain/user/user';
import { UserPassword } from '@domain/_vo/user-password';

export const userStub = {
  id: 1,
  name: userName,
  email: userEmail,
  password: {
    async compare(password: string) {},
  } as UserPassword,
} as User;
