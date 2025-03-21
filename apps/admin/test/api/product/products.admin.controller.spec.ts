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

    expect(productsAdminService.postProduct).toHaveBeenCalledWith(
      createProductDto,
    );
  });

  it('get', () => {
    productsAdminController.getProducts();

    expect(productsAdminService.getProducts).toHaveBeenCalled();
  });

  it('put', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    productsAdminController.putProduct(3, updateProductDto);

    expect(productsAdminService.putProduct).toHaveBeenCalledWith(
      3,
      updateProductDto,
    );
  });

  it('delete', () => {
    productsAdminController.deleteProduct(3);

    expect(productsAdminService.deleteProduct).toHaveBeenCalledWith(3);
  });
});
