import { UserPointService } from '../user-point.service';
import { UserPointHistoryAction } from '../user-point';

describe('UserPointService', () => {
  const userPointService = new UserPointService();

  describe('save', () => {
    it('성공', () => {
      const userPoint = userPointService.savePoint(
        1,
        1000,
        UserPointHistoryAction.ORDER_PRODUCT,
        3,
      );
      expect(userPoint).toEqual({
        userId: 1,
        id: 3,
        point: 1000,
        remainingPoint: 1000,
        action: UserPointHistoryAction.ORDER_PRODUCT,
        actionId: 3,
      });
    });

    it('성공 - 신규 생성', () => {
      const userPoint = userPointService.savePoint(
        2,
        1000,
        UserPointHistoryAction.ORDER_PRODUCT,
        4,
      );
      expect(userPoint).toEqual({
        userId: 2,
        id: 4,
        point: 1000,
        remainingPoint: 1000,
        action: UserPointHistoryAction.ORDER_PRODUCT,
        actionId: 4,
      });
    });
  });

  it('use', () => {
    const userPoint = userPointService.usePoint(
      1,
      1500,
      UserPointHistoryAction.ORDER,
      1,
    );
    expect(userPoint).toEqual({
      userId: 1,
      id: 5,
      point: 1500,
      remainingPoint: 0,
      action: UserPointHistoryAction.ORDER,
      actionId: 1,
    });
  });
});
