import { UserPointService } from '../user-point.service';
import { UserPointHistoryAction } from '../user-point';

describe('UserPointService', () => {
  const userPointService = new UserPointService();

  it('save', () => {
    const userPoint = userPointService.savePoint(
      1,
      1000,
      UserPointHistoryAction.ORDER_PRODUCT,
      1,
    );
    expect(userPoint).toEqual({
      userId: 1,
      id: 2,
      point: 1000,
      action: UserPointHistoryAction.ORDER_PRODUCT,
      actionId: 1,
    });
  });

  it('use', () => {
    const userPoint = userPointService.usePoint(
      1,
      1000,
      UserPointHistoryAction.ORDER,
      1,
    );
    expect(userPoint).toEqual({
      userId: 1,
      id: 3,
      point: 1000,
      action: UserPointHistoryAction.ORDER,
      actionId: 1,
    });
  });
});
