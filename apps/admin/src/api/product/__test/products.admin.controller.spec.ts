import { Test } from '@nestjs/testing';
import { ProductsAdminController } from '../products.admin.controller';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/product.dto';
import { productsStub } from '@domain/product/__stub/product.stub';
import { ProductApplicationService } from '@application/product/product.application.service';

describe('ProductsAdminController', () => {
  let productsAdminController: ProductsAdminController;
  let productApplicationService: ProductApplicationService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [ProductsAdminController],
      providers: [
        {
          provide: ProductApplicationService,
          useValue: {
            createProduct: jest.fn(),
            findProducts: jest.fn().mockReturnValue(productsStub),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    productsAdminController = testingModule.get(ProductsAdminController);
    productApplicationService = testingModule.get(ProductApplicationService);
  });

  it('post', () => {
    const createProductDto = new CreateProductDto();
    createProductDto.name = 'test2';
    createProductDto.price = 20000;
    createProductDto.stock = 20;

    productsAdminController.postProduct(createProductDto);

    expect(productApplicationService.createProduct).toBeCalledWith(
      createProductDto,
    );
  });

  it('get', () => {
    productsAdminController.getProducts();

    expect(productApplicationService.findProducts).toBeCalled();
  });

  it('put', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    productsAdminController.putProduct(3, updateProductDto);

    expect(productApplicationService.updateProduct).toBeCalledWith(
      3,
      updateProductDto,
    );
  });

  it('delete', () => {
    productsAdminController.deleteProduct(3);

    expect(productApplicationService.deleteProduct).toBeCalledWith(3);
  });
});
