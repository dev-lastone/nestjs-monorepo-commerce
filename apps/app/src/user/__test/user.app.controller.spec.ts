import { Test, TestingModule } from '@nestjs/testing';
import { UserAppController } from '../user.app.controller';
import { UserAppService } from '../user.app.service';
import { NON_EXISTENT_ID } from '@common/common/constant/constants';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

describe('UserAppController', () => {
  let userAppController: UserAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserAppController],
      providers: [UserAppService],
    }).compile();

    userAppController = app.get<UserAppController>(UserAppController);
  });

  it('post', () => {
    const userId = 1;
    const dto = {
      zipcode: '01235',
      address: '서울시 강남구 신사동 *********',
      isDefault: false,
    };

    expect(userAppController.postUserAddress(userId, dto)).toEqual({
      id: 2,
      userId,
      ...dto,
    });
  });

  it('get', () => {
    const userId = 1;

    expect(userAppController.getUserAddresses(userId)).toEqual([
      {
        id: 1,
        userId,
        zipcode: '01234',
        address: '서울시 강남구 역삼동 *********',
        isDefault: true,
      },
    ]);
  });

  describe('put', () => {
    const userId = 1;
    const dto = {
      zipcode: '55555',
      address: '서울시 강남구 양재동 *********',
      isDefault: false,
    };

    it('성공', () => {
      const id = 1;

      expect(userAppController.putUserAddress(userId, id, dto)).toEqual({
        id,
        userId,
        ...dto,
      });
    });

    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      const id = NON_EXISTENT_ID;

      expect(() => userAppController.putUserAddress(userId, id, dto)).toThrow(
        ERROR_MESSAGES.UserAddressNotFound,
      );
    });

    it(ERROR_MESSAGES.UserAddressForbidden, () => {
      const id = 1;
      const userId = 2;

      expect(() => userAppController.putUserAddress(userId, id, dto)).toThrow(
        ERROR_MESSAGES.UserAddressForbidden,
      );
    });
  });

  describe('delete', () => {
    const userId = 1;

    it('성공', () => {
      const id = 1;

      expect(userAppController.deleteUserAddress(userId, id)).toBeUndefined();
    });

    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      const id = NON_EXISTENT_ID;

      expect(() => userAppController.deleteUserAddress(userId, id)).toThrow(
        ERROR_MESSAGES.UserAddressNotFound,
      );
    });

    it(ERROR_MESSAGES.UserAddressForbidden, () => {
      const id = 1;
      const userId = 2;

      expect(() => userAppController.deleteUserAddress(userId, id)).toThrow(
        ERROR_MESSAGES.UserAddressForbidden,
      );
    });
  });
});
