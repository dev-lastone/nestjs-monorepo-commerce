import { appUserStub } from './app-user.stub';
import { productStub1 } from '../../product/_stub/product.stub';

export const appUserCartStub = {
  id: 1n,
  userId: appUserStub.id,
  productId: productStub1.id,
  count: 1,
};
