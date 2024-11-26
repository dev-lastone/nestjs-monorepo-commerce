import { Test } from '@nestjs/testing';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/dto/product.dto';
import { ProductApplicationService } from '@application/product/product.application.service';
import { ProductsAdminController } from '../../../src/api/product/products.admin.controller';
import { productsStub } from '../../../../../libs/domain/test/product/_stub/product.stub';

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
