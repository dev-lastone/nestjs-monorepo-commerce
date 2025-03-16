import { appUserStub } from './app-user.stub';
import { productStub1 } from '../../product/_stub/product.stub';

export const appUserCartStub = {
  id: 1,
  userId: appUserStub.id,
  product: productStub1,
  count: 1,
};
