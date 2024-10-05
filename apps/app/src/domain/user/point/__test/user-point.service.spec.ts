import { UserPointService } from '../user-point.service';
import { UserPointHistoryAction } from '../user-point';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

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

  // TODO 단일. 전체 테스트시 쌓이는 데이터 차이로 인한 테스트 실패 작업 필요
  describe('use', () => {
    it('use - 포인트 부족', () => {
      expect(() =>
        userPointService.usePoint(1, 3001, UserPointHistoryAction.ORDER, 1),
      ).toThrowError(ERROR_MESSAGES.NotEnoughPoints);
    });

    it('성공', () => {
      const userPoint = userPointService.usePoint(
        1,
        1500,
        UserPointHistoryAction.ORDER,
        1,
      );
      expect(userPoint).toEqual({
        point: 1500,
        history: {
          userId: 1,
          id: 4,
          point: 1500,
          remainingPoint: 1500,
          action: UserPointHistoryAction.ORDER,
          actionId: 1,
        },
      });
    });
  });
});
