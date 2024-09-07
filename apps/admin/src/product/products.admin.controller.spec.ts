import { ProductsAdminController } from './products.admin.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsAdminService } from './products.admin.service';
import {
  PostProductAdminRequestDto,
  PutProductAdminRequestDto,
} from './products.admin.dto';
import { NotFoundException } from '@nestjs/common';

describe('AdminController', () => {
  let productsAdminController: ProductsAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsAdminController],
      providers: [ProductsAdminService],
    }).compile();

    productsAdminController = app.get<ProductsAdminController>(
      ProductsAdminController,
    );
  });

  describe('products', () => {
    it('post', () => {
      const postProductAdminRequestDto = new PostProductAdminRequestDto();
      postProductAdminRequestDto.name = 'test2';
      postProductAdminRequestDto.price = 20000;

      expect(
        productsAdminController.postProduct(postProductAdminRequestDto),
      ).toEqual({
        id: 2,
        ...postProductAdminRequestDto,
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
      it('404', () => {
        const id = Number.MAX_SAFE_INTEGER;
        const putProductAdminRequestDto = new PutProductAdminRequestDto();
        putProductAdminRequestDto.name = '상품2';
        putProductAdminRequestDto.price = 15000;

        expect(() =>
          productsAdminController.putProduct(id, putProductAdminRequestDto),
        ).toThrow(new NotFoundException());
      });

      it('201', () => {
        const id = 1;
        const putProductAdminRequestDto = new PutProductAdminRequestDto();
        putProductAdminRequestDto.name = '상품2';
        putProductAdminRequestDto.price = 15000;

        expect(
          productsAdminController.putProduct(id, putProductAdminRequestDto),
        ).toEqual({
          id,
          ...putProductAdminRequestDto,
        });
      });
    });
  });
});
