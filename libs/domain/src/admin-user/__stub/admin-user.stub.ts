import { UserName } from '@domain/_vo/user-name';

export const adminUserStub = {
  id: 1,
  name: UserName.create('홍길동'),
  email: 'test@test.com',
  password: '1234',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const invalidAdminUserStub = {
  email: 'invalid@test.come',
  password: 'invalid',
};
