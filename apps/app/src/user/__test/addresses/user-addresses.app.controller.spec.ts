import { Test, TestingModule } from '@nestjs/testing';
import { NON_EXISTENT_ID } from '@common/common/constant/constants';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { UserAddressesAppController } from '../../addresses/user-addresses.app.controller';
import { UserAddressesAppService } from '../../addresses/user-addresses.app.service';

describe('UserAppController', () => {
  let userAddressesAppController: UserAddressesAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserAddressesAppController],
      providers: [UserAddressesAppService],
    }).compile();

    userAddressesAppController = app.get<UserAddressesAppController>(
      UserAddressesAppController,
    );
  });

  it('post', () => {
    const userId = 1;
    const dto = {
      zipcode: '01235',
      address: '서울시 강남구 신사동 *********',
      isDefault: false,
    };

    expect(userAddressesAppController.postUserAddress(userId, dto)).toEqual({
      id: 2,
      userId,
      ...dto,
    });
  });

  it('get', () => {
    const userId = 1;

    expect(userAddressesAppController.getUserAddresses(userId)).toEqual([
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

      expect(
        userAddressesAppController.putUserAddress(userId, id, dto),
      ).toEqual({
        id,
        userId,
        ...dto,
      });
    });

    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      const id = NON_EXISTENT_ID;

      expect(() =>
        userAddressesAppController.putUserAddress(userId, id, dto),
      ).toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });

    it(ERROR_MESSAGES.UserAddressForbidden, () => {
      const id = 1;
      const userId = 2;

      expect(() =>
        userAddressesAppController.putUserAddress(userId, id, dto),
      ).toThrow(ERROR_MESSAGES.UserAddressForbidden);
    });
  });

  describe('delete', () => {
    const userId = 1;

    it('성공', () => {
      const id = 1;

      expect(
        userAddressesAppController.deleteUserAddress(userId, id),
      ).toBeUndefined();
    });

    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      const id = NON_EXISTENT_ID;

      expect(() =>
        userAddressesAppController.deleteUserAddress(userId, id),
      ).toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });

    it(ERROR_MESSAGES.UserAddressForbidden, () => {
      const id = 1;
      const userId = 2;

      expect(() =>
        userAddressesAppController.deleteUserAddress(userId, id),
      ).toThrow(ERROR_MESSAGES.UserAddressForbidden);
    });
  });
});
