import { Test, TestingModule } from '@nestjs/testing';
import { NON_EXISTENT_ID } from '@common/common/constant/constants';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { UserAddressesAppController } from '../../addresses/user-addresses.app.controller';
import { UserAddressesAppService } from '../../addresses/user-addresses.app.service';
import { userAddressStub } from '../../../../domain/user/address/__stub/user-address.stub';

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
    describe('신규 생성', () => {
      const userId = 2;
      const dto = {
        zipcode: '01235',
        address: '서울시 강남구 신사동 *********',
        isDefault: false,
      };

      it(ERROR_MESSAGES.UserAddressDefaultRequired, () => {
        expect(() =>
          userAddressesAppController.postUserAddress(userId, dto),
        ).toThrow(ERROR_MESSAGES.UserAddressDefaultRequired);
      });

      it('성공', () => {
        dto.isDefault = true;

        expect(userAddressesAppController.postUserAddress(userId, dto)).toEqual(
          {
            id: 1,
            userId,
            ...dto,
          },
        );
      });
    });

    describe('추가 생성', () => {
      const userId = userAddressStub.userId;
      const dto = {
        zipcode: '01235',
        address: '서울시 강남구 신사동 *********',
        isDefault: true,
      };

      it('isDefault true', () => {
        expect(userAddressesAppController.postUserAddress(userId, dto)).toEqual(
          {
            id: 2,
            userId,
            ...dto,
          },
        );
      });

      it('isDefault false', () => {
        dto.isDefault = false;
        expect(userAddressesAppController.postUserAddress(userId, dto)).toEqual(
          {
            id: 2,
            userId,
            ...dto,
          },
        );
      });
    });

    it(ERROR_MESSAGES.UserAddressMaxLength, () => {
      const userId = userAddressStub.userId;
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
    expect(
      userAddressesAppController.getUserAddresses(userAddressStub.userId),
    ).toEqual([userAddressStub]);
  });

  describe('put', () => {
    const userId = userAddressStub.userId;
    const dto = {
      zipcode: '55555',
      address: '서울시 강남구 양재동 *********',
      isDefault: false,
    };

    it('성공', () => {
      const id = userAddressStub.id;

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
    const userId = userAddressStub.userId;

    it('성공', () => {
      const id = userAddressStub.id;

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
