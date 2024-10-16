import { Test } from '@nestjs/testing';
import { NON_EXISTENT_ID } from '@common/constant/constants';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { UserAddressesAppService } from '../../addresses/user-addresses.app.service';
import { userAddressStub } from '../../../../domain/user/address/__stub/user-address.stub';
import { UserAddressModule } from '../../../../domain/user/address/user-address.module';
import { UserAddressRepo } from '../../../../domain/user/address/user-address.repo';
import { ForbiddenException } from '@nestjs/common';

describe('UserAddressesAppService', () => {
  const userId = userAddressStub.userId;
  let userAddressesService: UserAddressesAppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [UserAddressModule],
      providers: [UserAddressesAppService, UserAddressRepo],
    }).compile();

    userAddressesService = testingModule.get(UserAddressesAppService);
  });

  describe('post', () => {
    const dto = {
      zipcode: '01235',
      address: '서울시 강남구 신사동 *********',
      isDefault: false,
    };

    describe('신규 생성', () => {
      const userId = 2;

      it(ERROR_MESSAGES.UserAddressDefaultRequired, () => {
        expect(() => userAddressesService.postUserAddress(userId, dto)).toThrow(
          ERROR_MESSAGES.UserAddressDefaultRequired,
        );
      });

      it('성공', () => {
        dto.isDefault = true;

        expect(userAddressesService.postUserAddress(userId, dto)).toEqual({
          id: 2,
          userId,
          ...dto,
        });
      });
    });

    describe('추가 생성', () => {
      it('isDefault false', () => {
        expect(userAddressesService.postUserAddress(userId, dto)).toEqual({
          id: 2,
          userId,
          ...dto,
        });
      });

      it('isDefault true', () => {
        dto.isDefault = true;

        expect(userAddressesService.postUserAddress(userId, dto)).toEqual({
          id: 2,
          userId,
          ...dto,
        });
      });
    });

    it(ERROR_MESSAGES.UserAddressMaxLength, () => {
      for (let i = 0; i < 9; i++) {
        userAddressesService.postUserAddress(userId, dto);
      }

      expect(() => userAddressesService.postUserAddress(userId, dto)).toThrow(
        ERROR_MESSAGES.UserAddressMaxLength,
      );
    });
  });

  it('get', () => {
    expect(
      userAddressesService.getUserAddresses(userAddressStub.userId),
    ).toEqual([userAddressStub]);
  });

  describe('put', () => {
    const dto = {
      zipcode: '55555',
      address: '서울시 강남구 양재동 *********',
      isDefault: false,
    };

    it('성공', () => {
      const id = userAddressStub.id;

      expect(
        userAddressesService.putUserAddress({ userId, id, ...dto }),
      ).toEqual({
        userId,
        id,
        ...dto,
      });
    });

    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      expect(() =>
        userAddressesService.putUserAddress({
          id: NON_EXISTENT_ID,
          userId: NON_EXISTENT_ID,
          ...dto,
        }),
      ).toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });

    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      expect(() =>
        userAddressesService.putUserAddress({
          id: NON_EXISTENT_ID,
          userId,
          ...dto,
        }),
      ).toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });
  });

  describe('delete', () => {
    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      expect(() =>
        userAddressesService.deleteUserAddress(userId, NON_EXISTENT_ID),
      ).toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });

    it('403', () => {
      expect(() =>
        userAddressesService.deleteUserAddress(2, userAddressStub.id),
      ).toThrowError(new ForbiddenException());
    });

    it('성공', () => {
      const id = userAddressStub.id;

      expect(
        userAddressesService.deleteUserAddress(userId, id),
      ).toBeUndefined();
    });
  });
});
