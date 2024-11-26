import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { userStub } from '../../_vo/_stub/user.stub';

export const adminUserStub = {
  id: 1,
  user: userStub,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
} as AdminUser;
