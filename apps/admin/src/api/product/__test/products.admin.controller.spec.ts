import { Test } from '@nestjs/testing';
import { ProductsAdminController } from '../products.admin.controller';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/product.dto';
import { productsStub } from '@domain/product/__stub/product.stub';
import { ProductService } from '@domain/product/product.service';

describe('ProductsAdminController', () => {
  let productsAdminController: ProductsAdminController;
  let productService: ProductService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [ProductsAdminController],
      providers: [
        {
          provide: ProductService,
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
    productService = testingModule.get(ProductService);
  });

  it('post', () => {
    const createProductDto = new CreateProductDto();
    createProductDto.name = 'test2';
    createProductDto.price = 20000;
    createProductDto.stock = 20;

    productsAdminController.postProduct(createProductDto);

    expect(productService.createProduct).toBeCalledWith(createProductDto);
  });

  it('get', () => {
    productsAdminController.getProducts();

    expect(productService.findProducts).toBeCalled();
  });

  it('put', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    productsAdminController.putProduct(3, updateProductDto);

    expect(productService.updateProduct).toBeCalledWith(3, updateProductDto);
  });

  it('delete', () => {
    productsAdminController.deleteProduct(3);

    expect(productService.deleteProduct).toBeCalledWith(3);
  });
});
