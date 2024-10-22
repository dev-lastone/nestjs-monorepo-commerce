import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '../app-user-point.entity';

const userPointStub = new AppUserPoint(1);
userPointStub.save(1000, AppUserPointHistoryAction.ORDER_PRODUCT, 1);
userPointStub.save(1000, AppUserPointHistoryAction.ORDER_PRODUCT, 2);

export const userPointStubs = [userPointStub];
