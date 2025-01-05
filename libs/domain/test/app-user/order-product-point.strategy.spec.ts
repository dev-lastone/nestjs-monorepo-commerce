import { orderProductWithOrderAndProductStub } from '../order/_stub/order-product.stub';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';
import { OrderProductPointStrategy } from '@domain/app-user/point/strategy/order-product-point.strategy';

it('OrderProductPointStrategy', () => {
  const strategy = new OrderProductPointStrategy(
    orderProductWithOrderAndProductStub,
  );

  expect(strategy.userId).toBe(
    orderProductWithOrderAndProductStub.order.userId,
  );
  expect(strategy.action).toBe(AppUserPointHistoryAction.ORDER_PRODUCT);
  expect(strategy.actionId).toBe(orderProductWithOrderAndProductStub.id);
  expect(strategy.point).toBe(100);
  expect(strategy.expirationAt).toBeInstanceOf(Date);
});
