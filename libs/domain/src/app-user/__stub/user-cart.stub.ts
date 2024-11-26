import { appUserStub } from '@domain/app-user/__stub/app-user.stub';
import { productStub1 } from '@domain/product/__stub/product.stub';

export const userCartStub = {
  id: 1,
  userId: appUserStub.id,
  productId: productStub1.id,
  count: 1,
};