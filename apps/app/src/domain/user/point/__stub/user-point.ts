import { UserPoint, UserPointHistoryAction } from '../user-point';

const userPoint = new UserPoint(1);
userPoint.save(1000, UserPointHistoryAction.ORDER_PRODUCT, 1);
userPoint.save(1000, UserPointHistoryAction.ORDER_PRODUCT, 2);

export const userPoints = [userPoint];
