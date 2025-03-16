import { Test } from '@nestjs/testing';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/dto/product.dto';
import { ProductService } from '@application/product/product.service';
import { productsStub } from '../../../../../libs/domain/test/product/_stub/product.stub';
import { ProductsAdminRepo } from '../../../src/api/product/products.admin.repo';
import { ProductsAdminService } from '../../../src/api/product/products.admin.service';

describe('ProductsAdminService', () => {
  let productsAdminService: ProductsAdminService;
  let productService: ProductService;
  let productsAdminRepo: ProductsAdminRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        ProductsAdminService,
        {
          provide: ProductService,
          useValue: {
            createProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
          },
        },
        {
          provide: ProductsAdminRepo,
          useValue: {
            find: jest.fn().mockReturnValue(productsStub),
          },
        },
      ],
    }).compile();

    productsAdminService = testingModule.get(ProductsAdminService);
    productService = testingModule.get(ProductService);
    productsAdminRepo = testingModule.get(ProductsAdminRepo);
  });

  it('post', () => {
    const createProductDto = new CreateProductDto();
    createProductDto.name = 'test2';
    createProductDto.price = 20000;
    createProductDto.stock = 20;

    productsAdminService.postProduct(createProductDto);

    expect(productService.createProduct).toHaveBeenCalledWith(createProductDto);
  });

  it('get', () => {
    productsAdminService.getProducts();

    expect(productsAdminRepo.find).toHaveBeenCalled();
  });

  it('put', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    productsAdminService.putProduct(3, updateProductDto);

    expect(productService.updateProduct).toHaveBeenCalledWith(
      3,
      updateProductDto,
    );
  });

  it('delete', () => {
    productsAdminService.deleteProduct(3);

    expect(productService.deleteProduct).toHaveBeenCalledWith(3);
  });
});
