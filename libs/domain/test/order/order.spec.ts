import { Product } from '@domain/product/product.entity';
import { OrderProduct } from '@domain/order/order-product.entity';
import { productStub1, productStub2 } from '../product/_stub/product.stub';
import { userAddressStub } from '../app-user/_stub/user-address.stub';
import { Order } from '@domain/order/order.entity';

describe('Order Entity', () => {
  it('should create an order with user address and products', () => {
    const userAddress = userAddressStub;
    const products: Product[] = [productStub1, productStub2];

    const order = Order.create(userAddress, products);

    expect(order.userId).toBe(1);
    expect(order.address).toEqual(userAddress.address);
    expect(order.products.length).toBe(2);
    expect(order.products[0]).toBeInstanceOf(OrderProduct);
    expect(order.products[1]).toBeInstanceOf(OrderProduct);
  });
});
