import { Test } from '@nestjs/testing';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/dto/product.dto';
import { ProductsAdminController } from '../../../src/api/product/products.admin.controller';
import { ProductsAdminService } from '../../../src/api/product/products.admin.service';

describe('ProductsAdminController', () => {
  let productsAdminController: ProductsAdminController;
  let productsAdminService: ProductsAdminService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [ProductsAdminController],
      providers: [
        {
          provide: ProductsAdminService,
          useValue: {
            postProduct: jest.fn(),
            getProducts: jest.fn(),
            putProduct: jest.fn(),
            deleteProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    productsAdminController = testingModule.get(ProductsAdminController);
    productsAdminService = testingModule.get(ProductsAdminService);
  });

  it('post', () => {
    const createProductDto = new CreateProductDto();
    createProductDto.name = 'test2';
    createProductDto.price = 20000;
    createProductDto.stock = 20;

    productsAdminController.postProduct(createProductDto);

    expect(productsAdminService.postProduct).toBeCalledWith(createProductDto);
  });

  it('get', () => {
    productsAdminController.getProducts();

    expect(productsAdminService.getProducts).toBeCalled();
  });

  it('put', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    productsAdminController.putProduct(3n, updateProductDto);

    expect(productsAdminService.putProduct).toBeCalledWith(
      3n,
      updateProductDto,
    );
  });

  it('delete', () => {
    productsAdminController.deleteProduct(3n);

    expect(productsAdminService.deleteProduct).toBeCalledWith(3n);
  });
});
