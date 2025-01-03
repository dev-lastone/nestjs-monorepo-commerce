import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';
import { SaveAppUserPointDto } from '@domain/app-user/dto/app-user-point.dto';
import { userStub } from '../../user/stub/user.stub';
import { orderProductStub } from '../../order/_stub/order-product.stub';

const expirationAt = new Date();
expirationAt.setDate(expirationAt.getDate() + 7);

export const saveAppUserPointDtoStub = {
  userId: userStub.id,
  point: 1000,
  action: AppUserPointHistoryAction.ORDER_PRODUCT,
  actionId: orderProductStub.id,
  expirationAt,
} as SaveAppUserPointDto;
