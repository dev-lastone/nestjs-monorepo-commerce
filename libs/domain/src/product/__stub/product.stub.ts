import { Product } from '@domain/domain/product/product';

export const productStub1 = new Product({
  id: 1,
  name: '상품명1',
  price: 10000,
  stock: 10,
});
export const productStub2 = new Product({
  id: 2,
  name: '상품명2',
  price: 20000,
  stock: 1,
});

export const productStubs = [productStub1, productStub2];
