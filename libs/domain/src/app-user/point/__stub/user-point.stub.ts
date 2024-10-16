import { UserPoint, UserPointHistoryAction } from '../user-point';

const userPointStub = new UserPoint(1);
userPointStub.save(1000, UserPointHistoryAction.ORDER_PRODUCT, 1);
userPointStub.save(1000, UserPointHistoryAction.ORDER_PRODUCT, 2);

export const userPointStubs = [userPointStub];
