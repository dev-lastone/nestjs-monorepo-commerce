import { invalidUserPasswordStub } from '@domain/_vo/__stub/user-password.stub';
import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { userStub } from '@domain/_vo/__stub/user.stub';

export const adminUserStub = {
  id: 1,
  user: userStub,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
} as AdminUser;

export const invalidAdminUserStub = {
  email: 'invalid@test.come',
  password: invalidUserPasswordStub,
};
