import { Injectable } from '@nestjs/common';
import { Product } from '@domain/product/product';
import { productsStub } from '@domain/product/__stub/product.stub';

@Injectable()
export class ProductRepo {
  #products: Product[] = productsStub;

  find(): Product[] {
    return this.#products;
  }

  findOneById(id: number): Product {
    return this.#products.find((product) => product.id === id);
  }

  save(product: Product): Product {
    if (product.id) {
      const _product = this.#products.find(
        (_product) => _product.id === product.id,
      );
      _product.name = product.name;
      _product.price = product.price;
      _product.stock = product.stock;
    } else {
      product.id = this.#products[this.#products.length - 1].id + 1;
      this.#products.push(product);
    }

    return product;
  }

  delete(id: number) {
    const idx = this.#products.findIndex((product) => product.id === id);
    this.#products.splice(idx, 1);
  }
}
