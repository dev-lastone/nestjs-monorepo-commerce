import { ProductsAdminController } from './products.admin.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsAdminService } from './products.admin.service';
import {
  PostProductAdminRequestDto,
  PutProductAdminRequestDto,
} from './products.admin.dto';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('AdminController', () => {
  const NON_EXISTENT_ID = Number.MAX_SAFE_INTEGER;

  let productsAdminController: ProductsAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsAdminController],
      providers: [
        ProductsAdminService,
        {
          provide: JwtService,
          useValue: {},
        },
      ],
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
      const putProductAdminRequestDto = new PutProductAdminRequestDto();
      putProductAdminRequestDto.name = '상품2';
      putProductAdminRequestDto.price = 15000;

      it('404', () => {
        expect(() =>
          productsAdminController.putProduct(
            NON_EXISTENT_ID,
            putProductAdminRequestDto,
          ),
        ).toThrow(new NotFoundException());
      });

      it('200', () => {
        const id = 1;

        expect(
          productsAdminController.putProduct(id, putProductAdminRequestDto),
        ).toEqual({
          id,
          ...putProductAdminRequestDto,
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
});
