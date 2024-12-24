import { Test } from '@nestjs/testing';
import { NON_EXISTENT_ID, SUCCESS } from '@common/constant/constants';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { ForbiddenException } from '@nestjs/common';
import { AppUserAddress } from '@domain/app-user/app-user-address.entity';
import { appUserAddressStub } from '../../../../../../libs/domain/test/app-user/_stub/app-user-address.stub';
import { UserAddressRepo } from '../../../../src/application/user/address/user-address.repo';
import { UserAddressService } from '../../../../src/application/user/address/user-address.service';

describe('UserAddressService', () => {
  const userId = appUserAddressStub.userId;
  let userAddressService: UserAddressService;
  let userAddressRepo: UserAddressRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        UserAddressService,
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

    userAddressService = testingModule.get(UserAddressService);
    userAddressRepo = testingModule.get(UserAddressRepo);
  });

  describe('create', () => {
    const dto = {
      isDefault: false,
      address: {
        zipcode: '01235',
        address: '서울시 강남구 신사동 *********',
      },
    };

    describe('신규 생성', () => {
      const userId = 2n;

      it(ERROR_MESSAGES.UserAddressDefaultRequired, () => {
        expect(() =>
          userAddressService.createUserAddress({ userId, ...dto }),
        ).rejects.toThrow(ERROR_MESSAGES.UserAddressDefaultRequired);
      });

      it(SUCCESS, async () => {
        dto.isDefault = true;

        const userAddress = AppUserAddress.create({
          userId,
          ...dto,
        });
        userAddress.id = 2n;

        jest.spyOn(userAddressRepo, 'save').mockResolvedValue(userAddress);

        const result = await userAddressService.createUserAddress({
          userId,
          ...dto,
        });
        expect(result).toEqual({
          id: 2n,
          userId,
          ...dto,
        });
      });
    });

    describe('추가 생성', () => {
      it('isDefault false', async () => {
        jest
          .spyOn(userAddressRepo, 'findByUserId')
          .mockResolvedValue([appUserAddressStub]);

        const userAddress = AppUserAddress.create({
          userId,
          ...dto,
        });

        jest.spyOn(userAddressRepo, 'save').mockResolvedValue({
          id: 2,
          ...userAddress,
        });

        const result = await userAddressService.createUserAddress({
          userId,
          ...dto,
        });

        expect(result).toEqual({
          id: 2,
          userId,
          ...dto,
        });
      });

      it('isDefault true', async () => {
        dto.isDefault = true;

        const userAddress = AppUserAddress.create({
          userId,
          ...dto,
        });

        jest.spyOn(userAddressRepo, 'save').mockResolvedValue({
          id: 2,
          ...userAddress,
        });

        const result = await userAddressService.createUserAddress({
          userId,
          ...dto,
        });
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
        .mockResolvedValue(new Array(10).fill(appUserAddressStub));

      expect(() =>
        userAddressService.createUserAddress({ userId, ...dto }),
      ).rejects.toThrow(ERROR_MESSAGES.UserAddressMaxLength);
    });
  });

  it('getUserAddresses', async () => {
    jest
      .spyOn(userAddressRepo, 'findByUserId')
      .mockResolvedValue([appUserAddressStub]);

    const result = await userAddressService.getUserAddresses(
      appUserAddressStub.userId,
    );
    expect(result).toEqual([appUserAddressStub]);
  });

  describe('update', () => {
    const dto = {
      isDefault: false,
      address: {
        zipcode: '55555',
        address: '서울시 강남구 양재동 *********',
      },
    };

    it(SUCCESS, async () => {
      const id = appUserAddressStub.id;

      jest
        .spyOn(userAddressRepo, 'findOneById')
        .mockResolvedValue(appUserAddressStub);
      jest.spyOn(userAddressRepo, 'save').mockResolvedValue(appUserAddressStub);

      const result = await userAddressService.updateUserAddress({
        id,
        userId,
        ...dto,
      });
      expect(result).toEqual({
        id,
        userId,
        ...dto,
      });
    });

    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      expect(() =>
        userAddressService.updateUserAddress({
          id: NON_EXISTENT_ID,
          userId: NON_EXISTENT_ID,
          ...dto,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });

    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      expect(() =>
        userAddressService.updateUserAddress({
          id: NON_EXISTENT_ID,
          userId,
          ...dto,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });

    it('403', () => {
      jest
        .spyOn(userAddressRepo, 'findOneById')
        .mockResolvedValue(appUserAddressStub);

      expect(() =>
        userAddressService.updateUserAddress({
          id: appUserAddressStub.id,
          userId: 2n,
          ...dto,
        }),
      ).rejects.toThrow(new ForbiddenException());
    });
  });

  describe('delete', () => {
    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      expect(() =>
        userAddressService.deleteUserAddress({ userId, id: NON_EXISTENT_ID }),
      ).rejects.toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });

    it('403', () => {
      jest
        .spyOn(userAddressRepo, 'findOneById')
        .mockResolvedValue(appUserAddressStub);

      expect(() =>
        userAddressService.deleteUserAddress({
          userId: 2n,
          id: appUserAddressStub.id,
        }),
      ).rejects.toThrow(new ForbiddenException());
    });

    it('성공', async () => {
      const id = appUserAddressStub.id;

      jest
        .spyOn(userAddressRepo, 'findOneById')
        .mockResolvedValue(appUserAddressStub);

      const result = await userAddressService.deleteUserAddress({
        userId,
        id,
      });

      expect(result).toBeUndefined();
    });
  });

  describe('getUserAddressById', () => {
    it(ERROR_MESSAGES.UserAddressNotFound, () => {
      jest
        .spyOn(userAddressRepo, 'findOneById')
        .mockResolvedValue(undefined as any);

      expect(() =>
        userAddressService.getUserAddressById(NON_EXISTENT_ID),
      ).rejects.toThrow(ERROR_MESSAGES.UserAddressNotFound);
    });

    it(SUCCESS, async () => {
      jest
        .spyOn(userAddressRepo, 'findOneById')
        .mockResolvedValue(appUserAddressStub);

      const result = await userAddressService.getUserAddressById(
        appUserAddressStub.id,
      );
      expect(result).toEqual(appUserAddressStub);
    });
  });
});
