import { UserPointService } from '../user-point.service';
import { UserPointHistoryAction } from '../user-point';

describe('UserPointService', () => {
  const userPointService = new UserPointService();

  describe('savePoint', () => {
    it('성공', () => {
      const userPoint = userPointService.savePoint(
        1,
        1000,
        UserPointHistoryAction.ORDER_PRODUCT,
        3,
      );
      expect(userPoint).toEqual({
        point: 3000,
        history: {
          userId: 1,
          id: 3,
          point: 1000,
          remainingPoint: 3000,
          action: UserPointHistoryAction.ORDER_PRODUCT,
          actionId: 3,
        },
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
        point: 1000,
        history: {
          userId: 2,
          id: 1,
          point: 1000,
          remainingPoint: 1000,
          action: UserPointHistoryAction.ORDER_PRODUCT,
          actionId: 4,
        },
      });
    });
  });

  it('usePoint', () => {
    const test = userPointService.savePoint(
      3,
      1000,
      UserPointHistoryAction.ORDER_PRODUCT,
      5,
    );

    const userPoint = userPointService.usePoint(
      3,
      1000,
      UserPointHistoryAction.ORDER,
      1,
    );
    expect(userPoint).toEqual({
      point: 0,
      history: {
        userId: 3,
        id: 2,
        point: 1000,
        remainingPoint: 0,
        action: UserPointHistoryAction.ORDER,
        actionId: 1,
      },
    });
  });
});
