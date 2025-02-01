import { Test } from '@nestjs/testing';
import { NON_EXISTENT_ID } from '@common/constant/constants';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { ProductRepo } from '@application/product/product.repo';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/dto/product.dto';
import { ProductService } from '@application/product/product.service';
import {
  productsStub,
  productStub1,
} from '../../../domain/test/product/_stub/product.stub';

describe('productService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepo,
          useValue: {
            find: jest.fn().mockResolvedValue(productsStub),
            findOneById: jest.fn().mockImplementation((id) => {
              if (id === NON_EXISTENT_ID) return undefined;
              return productStub1;
            }),
            save: jest.fn().mockImplementation((product) => ({
              id: 3,
              ...product,
            })),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    productService = testingModule.get(ProductService);
  });

  it('createProduct', async () => {
    const createProductDto = new CreateProductDto();
    createProductDto.name = 'test2';
    createProductDto.price = 20000;
    createProductDto.stock = 20;

    const result = await productService.createProduct(createProductDto);
    expect(result).toEqual({
      id: 3,
      ...createProductDto,
    });
  });

  it('findProducts', async () => {
    const result = await productService.findProducts();
    expect(result).toEqual(productsStub);
  });

  it('findOneProduct', async () => {
    const result = await productService.findOneProduct(1);
    expect(result).toEqual(productStub1);
  });

  describe('updateProduct', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    it(ERROR_MESSAGES.ProductNotFound, () => {
      expect(
        async () =>
          await productService.updateProduct(NON_EXISTENT_ID, updateProductDto),
      ).rejects.toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', async () => {
      const id = 1;
      const result = await productService.updateProduct(id, updateProductDto);
      expect(result).toEqual({
        id,
        name: updateProductDto.name,
        price: updateProductDto.price,
      });
    });
  });

  describe('deleteProduct', () => {
    it(ERROR_MESSAGES.ProductNotFound, () => {
      expect(
        async () => await productService.deleteProduct(NON_EXISTENT_ID),
      ).rejects.toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', async () => {
      await productService.deleteProduct(productStub1.id);
      const result = await productService.findProducts();

      expect(result).toEqual(productsStub);
    });
  });

  describe('checkExistentProduct', () => {
    it('실패', () => {
      expect(async () =>
        productService.checkExistentProduct(NON_EXISTENT_ID),
      ).rejects.toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', async () => {
      const result = await productService.checkExistentProduct(productStub1.id);
      expect(result).toBe(productStub1);
    });
  });
});
