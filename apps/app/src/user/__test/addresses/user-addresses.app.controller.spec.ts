import { Test, TestingModule } from '@nestjs/testing';
import { NON_EXISTENT_ID } from '@common/common/constant/constants';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { UserAddressesAppController } from '../../addresses/user-addresses.app.controller';
import { UserAddressesAppService } from '../../addresses/user-addresses.app.service';

describe('UserAddressesAppController', () => {
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

  describe('post', () => {
    it('신규 생성', () => {
      const userId = 2;
      const dto = {
        zipcode: '01235',
        address: '서울시 강남구 신사동 *********',
        isDefault: false,
      };

      expect(userAddressesAppController.postUserAddress(userId, dto)).toEqual({
        userId,
        id: 1,
        ...dto,
      });
    });

    it('추가 생성', () => {
      const userId = 1;
      const dto = {
        zipcode: '01235',
        address: '서울시 강남구 신사동 *********',
        isDefault: false,
      };

      expect(userAddressesAppController.postUserAddress(userId, dto)).toEqual({
        userId,
        id: 2,
        ...dto,
      });
    });

    it(ERROR_MESSAGES.UserAddressMaxLength, () => {
      const userId = 1;
      const dto = {
        zipcode: '01235',
        address: '서울시 강남구 신사동 *********',
        isDefault: false,
      };

      for (let i = 0; i < 9; i++) {
        userAddressesAppController.postUserAddress(userId, dto);
      }

      expect(() =>
        userAddressesAppController.postUserAddress(userId, dto),
      ).toThrow(ERROR_MESSAGES.UserAddressMaxLength);
    });
  });

  it('get', () => {
    const userId = 1;

    expect(userAddressesAppController.getUserAddresses(userId)).toEqual([
      {
        userId,
        id: 1,
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
        userId,
        id,
        ...dto,
      });
    });

    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      expect(() =>
        userAddressesAppController.putUserAddress(
          NON_EXISTENT_ID,
          NON_EXISTENT_ID,
          dto,
        ),
      ).toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });

    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      expect(() =>
        userAddressesAppController.putUserAddress(userId, NON_EXISTENT_ID, dto),
      ).toThrow(ERROR_MESSAGES.UserAddressNotFound);
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
      expect(() =>
        userAddressesAppController.deleteUserAddress(userId, NON_EXISTENT_ID),
      ).toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });
  });
});
