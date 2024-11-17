export const adminUserStub = {
  id: 1,
  name: '홍길동',
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
