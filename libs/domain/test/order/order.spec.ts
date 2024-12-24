import { Product } from '@domain/product/product.entity';
import { OrderProduct } from '@domain/order/order-product.entity';
import { productStub1, productStub2 } from '../product/_stub/product.stub';
import { appUserAddressStub } from '../app-user/_stub/app-user-address.stub';
import { Order } from '@domain/order/order.entity';
import { userStub } from '../user/stub/user.stub';

describe('Order Entity', () => {
  it('should create an order with user address and products', () => {
    const userAddress = appUserAddressStub;
    const products: Product[] = [productStub1, productStub2];

    const order = Order.create(userAddress, products);

    expect(order.userId).toBe(userStub.id);
    expect(order.address).toEqual(userAddress.address);
    expect(order.products.length).toBe(2);
    expect(order.products[0]).toBeInstanceOf(OrderProduct);
    expect(order.products[1]).toBeInstanceOf(OrderProduct);
  });
});
