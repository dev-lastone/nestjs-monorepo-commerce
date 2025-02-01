import { Product } from '@domain/product/product.entity';

export const product1 = Product.create({
  name: '상품명1',
  price: 10000,
  stock: 1,
});
product1.id = 1;
export const productStub1 = product1;

export const product2 = Product.create({
  name: '상품명2',
  price: 20000,
  stock: 1,
});
product2.id = 2;
export const productStub2 = product2;

export const productsStub = [productStub1, productStub2];
