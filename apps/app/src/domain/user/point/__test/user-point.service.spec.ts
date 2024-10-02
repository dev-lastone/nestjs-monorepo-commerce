import { UserPointService } from '../user-point.service';
import { UserPointActionType } from '../user-point';

describe('UserPointService', () => {
  const userPointService = new UserPointService();

  it('save', () => {
    const userPoint = userPointService.savePoint(
      1,
      1000,
      UserPointActionType.ORDER_PRODUCT,
      1,
    );
    expect(userPoint).toEqual({
      userId: 1,
      id: 2,
      point: 1000,
      actionType: 'order-product',
      actionId: 1,
    });
  });
});
