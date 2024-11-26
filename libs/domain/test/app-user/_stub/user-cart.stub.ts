import { appUserStub } from './app-user.stub';
import { productStub1 } from '../../product/_stub/product.stub';

export const userCartStub = {
  id: 1,
  userId: appUserStub.id,
  productId: productStub1.id,
  count: 1,
};
