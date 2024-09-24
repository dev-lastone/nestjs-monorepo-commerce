import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsAdminController } from '../products.admin.controller';
import { ProductModule } from '@domain/domain/product/product.module';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/domain/product/product.dto';

describe('ProductsAdminController', () => {
  const NON_EXISTENT_ID = Number.MAX_SAFE_INTEGER;

  let productsAdminController: ProductsAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
      controllers: [ProductsAdminController],
    }).compile();

    productsAdminController = app.get<ProductsAdminController>(
      ProductsAdminController,
    );
  });

  it('post', () => {
    const createProductDto = new CreateProductDto();
    createProductDto.name = 'test2';
    createProductDto.price = 20000;

    expect(productsAdminController.postProduct(createProductDto)).toEqual({
      id: 2,
      ...createProductDto,
    });
  });

  it('get', () => {
    expect(productsAdminController.getProducts()).toEqual([
      {
        id: 1,
        name: 'test1',
        price: 10000,
      },
    ]);
  });

  describe('put', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    it('404', () => {
      expect(() =>
        productsAdminController.putProduct(NON_EXISTENT_ID, updateProductDto),
      ).toThrow(new NotFoundException());
    });

    it('200', () => {
      const id = 1;

      expect(productsAdminController.putProduct(id, updateProductDto)).toEqual({
        id,
        ...updateProductDto,
      });
    });
  });

  describe('delete', () => {
    it('404', () => {
      expect(() =>
        productsAdminController.deleteProduct(NON_EXISTENT_ID),
      ).toThrow(new NotFoundException());
    });

    it('200', () => {
      const id = 1;

      productsAdminController.deleteProduct(id);

      expect(productsAdminController.getProducts()).toEqual([]);
    });
  });
});
