import { Test } from '@nestjs/testing';
import { NON_EXISTENT_ID, SUCCESS } from '@common/constant/constants';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { UserAddressesAppService } from '../../addresses/user-addresses.app.service';
import { userAddressStub } from '../../../../domain/user/address/__stub/user-address.stub';
import { UserAddressRepo } from '../../../../domain/user/address/user-address.repo';
import { ForbiddenException } from '@nestjs/common';

describe('UserAddressesAppService', () => {
  const userId = userAddressStub.userId;
  let userAddressesService: UserAddressesAppService;
  let userAddressRepo: UserAddressRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        UserAddressesAppService,
        {
          provide: UserAddressRepo,
          useValue: {
            findByUserId: jest.fn(),
            save: jest.fn(),
            findOneById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userAddressesService = testingModule.get(UserAddressesAppService);
    userAddressRepo = testingModule.get(UserAddressRepo);
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
        expect(() =>
          userAddressesService.postUserAddress(userId, dto),
        ).rejects.toThrow(ERROR_MESSAGES.UserAddressDefaultRequired);
      });

      it(SUCCESS, async () => {
        dto.isDefault = true;

        jest.spyOn(userAddressRepo, 'save').mockResolvedValue({
          id: 2,
          userId,
          ...dto,
        });

        const result = await userAddressesService.postUserAddress(userId, dto);
        expect(result).toEqual({
          id: 2,
          userId,
          ...dto,
        });
      });
    });

    describe('추가 생성', () => {
      it('isDefault false', async () => {
        jest
          .spyOn(userAddressRepo, 'findByUserId')
          .mockResolvedValue([userAddressStub]);
        jest.spyOn(userAddressRepo, 'save').mockResolvedValue({
          id: 2,
          userId,
          ...dto,
        });

        const result = await userAddressesService.postUserAddress(userId, dto);

        expect(result).toEqual({
          id: 2,
          userId,
          ...dto,
        });
      });

      it('isDefault true', async () => {
        dto.isDefault = true;

        jest.spyOn(userAddressRepo, 'save').mockResolvedValue({
          id: 2,
          userId,
          ...dto,
        });

        const result = await userAddressesService.postUserAddress(userId, dto);
        expect(result).toEqual({
          id: 2,
          userId,
          ...dto,
        });
      });
    });

    it(ERROR_MESSAGES.UserAddressMaxLength, () => {
      jest
        .spyOn(userAddressRepo, 'findByUserId')
        .mockResolvedValue(new Array(10).fill(userAddressStub));

      expect(() =>
        userAddressesService.postUserAddress(userId, dto),
      ).rejects.toThrow(ERROR_MESSAGES.UserAddressMaxLength);
    });
  });

  it('get', async () => {
    jest
      .spyOn(userAddressRepo, 'findByUserId')
      .mockResolvedValue([userAddressStub]);

    const result = await userAddressesService.getUserAddresses(
      userAddressStub.userId,
    );
    expect(result).toEqual([userAddressStub]);
  });

  describe('put', () => {
    const dto = {
      zipcode: '55555',
      address: '서울시 강남구 양재동 *********',
      isDefault: false,
    };

    it(SUCCESS, async () => {
      const id = userAddressStub.id;

      jest
        .spyOn(userAddressRepo, 'findOneById')
        .mockResolvedValue(userAddressStub);
      jest.spyOn(userAddressRepo, 'save').mockResolvedValue({
        userId,
        id,
        ...dto,
      });

      const result = await userAddressesService.putUserAddress({
        userId,
        id,
        ...dto,
      });
      expect(result).toEqual({
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
      ).rejects.toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });

    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      expect(() =>
        userAddressesService.putUserAddress({
          id: NON_EXISTENT_ID,
          userId,
          ...dto,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });
  });

  describe('delete', () => {
    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      expect(() =>
        userAddressesService.deleteUserAddress(userId, NON_EXISTENT_ID),
      ).rejects.toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });

    it('403', () => {
      jest
        .spyOn(userAddressRepo, 'findOneById')
        .mockResolvedValue(userAddressStub);

      expect(() =>
        userAddressesService.deleteUserAddress(2, userAddressStub.id),
      ).rejects.toThrow(new ForbiddenException());
    });

    it('성공', async () => {
      const id = userAddressStub.id;

      jest
        .spyOn(userAddressRepo, 'findOneById')
        .mockResolvedValue(userAddressStub);

      const result = await userAddressesService.deleteUserAddress(userId, id);

      expect(result).toBeUndefined();
    });
  });
});
