import { Test } from '@nestjs/testing';
import { UserAddressesAppService } from '../../../../src/api/user/addresses/user-addresses.app.service';
import { appUserAddressStub } from '../../../../../../libs/domain/test/app-user/_stub/app-user-address.stub';
import { UserAddressService } from '../../../../src/application/user/address/user-address.service';

describe('UserAddressesAppService', () => {
  const userId = appUserAddressStub.userId;
  let userAddressesService: UserAddressesAppService;
  let userAddressService: UserAddressService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        UserAddressesAppService,
        {
          provide: UserAddressService,
          useValue: {
            createUserAddress: jest.fn(),
            getUserAddresses: jest.fn(),
            updateUserAddress: jest.fn(),
            deleteUserAddress: jest.fn(),
          },
        },
      ],
    }).compile();

    userAddressesService = testingModule.get(UserAddressesAppService);
    userAddressService = testingModule.get(UserAddressService);
  });

  it('postUserAddress', () => {
    const dto = {
      isDefault: true,
      address: {
        zipcode: '01235',
        address: '서울시 강남구 신사동 *********',
      },
    };

    userAddressesService.postUserAddress({ userId, ...dto });

    expect(userAddressService.createUserAddress).toHaveBeenCalledWith({
      userId,
      ...dto,
    });
  });

  it('getUserAddresses', () => {
    userAddressesService.getUserAddresses(userId);

    expect(userAddressService.getUserAddresses).toHaveBeenCalledWith(userId);
  });

  it('putUserAddress', () => {
    const id = appUserAddressStub.id;
    const dto = {
      isDefault: false,
      address: {
        zipcode: '01235',
        address: '서울시 강남구 신사동 *********',
      },
    };

    userAddressesService.putUserAddress({ id, userId, ...dto });

    expect(userAddressService.updateUserAddress).toHaveBeenCalledWith({
      id,
      userId,
      ...dto,
    });
  });

  it('deleteUserAddress', () => {
    const id = appUserAddressStub.id;

    userAddressesService.deleteUserAddress({ id, userId });

    expect(userAddressService.deleteUserAddress).toHaveBeenCalledWith({
      id,
      userId,
    });
  });
});
