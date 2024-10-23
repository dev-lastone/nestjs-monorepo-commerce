import { Test } from '@nestjs/testing';
import { NON_EXISTENT_ID } from '@common/constant/constants';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { ProductRepo } from '@domain/product/product.repo';
import {
  productsStub,
  productStub1,
} from '@domain/product/__stub/product.stub';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/product.dto';
import { ProductApplicationService } from '@application/product/product.application.service';

describe('ProductApplicationService', () => {
  let productApplicationService: ProductApplicationService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        ProductApplicationService,
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

    productApplicationService = testingModule.get(ProductApplicationService);
  });

  it('createProduct', async () => {
    const createProductDto = new CreateProductDto();
    createProductDto.name = 'test2';
    createProductDto.price = 20000;
    createProductDto.stock = 20;

    const result =
      await productApplicationService.createProduct(createProductDto);
    expect(result).toEqual({
      id: 3,
      ...createProductDto,
    });
  });

  it('findProducts', async () => {
    const result = await productApplicationService.findProducts();
    expect(result).toEqual(productsStub);
  });

  it('findOneProduct', async () => {
    const result = await productApplicationService.findOneProduct(1);
    expect(result).toEqual(productStub1);
  });

  describe('updateProduct', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    it(ERROR_MESSAGES.ProductNotFound, () => {
      expect(
        async () =>
          await productApplicationService.updateProduct(
            NON_EXISTENT_ID,
            updateProductDto,
          ),
      ).rejects.toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', async () => {
      const id = 1;
      const result = await productApplicationService.updateProduct(
        id,
        updateProductDto,
      );
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
        async () =>
          await productApplicationService.deleteProduct(NON_EXISTENT_ID),
      ).rejects.toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', async () => {
      await productApplicationService.deleteProduct(3);
      const result = await productApplicationService.findProducts();

      expect(result).toEqual(productsStub);
    });
  });

  describe('checkExistentProduct', () => {
    it('실패', () => {
      expect(async () =>
        productApplicationService.checkExistentProduct(NON_EXISTENT_ID),
      ).rejects.toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', async () => {
      const result = await productApplicationService.checkExistentProduct(
        productStub1.id,
      );
      expect(result).toBe(productStub1);
    });
  });
});
