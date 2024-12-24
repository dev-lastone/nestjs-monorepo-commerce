import { Test } from '@nestjs/testing';
import { UserAddressesAppController } from '../../../../src/api/user/addresses/user-addresses.app.controller';
import { UserAddressesAppService } from '../../../../src/api/user/addresses/user-addresses.app.service';
import { appUserAddressStub } from '../../../../../../libs/domain/test/app-user/_stub/app-user-address.stub';

describe('UserAddressesAppController', () => {
  let userAddressesAppController: UserAddressesAppController;
  let userAddressesAppService: UserAddressesAppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [UserAddressesAppController],
      providers: [
        {
          provide: UserAddressesAppService,
          useValue: {
            postUserAddress: jest.fn(),
            getUserAddresses: jest.fn(),
            putUserAddress: jest.fn(),
            deleteUserAddress: jest.fn(),
          },
        },
      ],
    }).compile();

    userAddressesAppController = testingModule.get(UserAddressesAppController);
    userAddressesAppService = testingModule.get(UserAddressesAppService);
  });

  it('postUserAddresses', () => {
    const userId = 2n;
    const dto = {
      isDefault: true,
      address: {
        zipcode: '01235',
        address: '서울시 강남구 신사동 *********',
      },
    };

    userAddressesAppController.postUserAddress(userId, dto);

    expect(userAddressesAppService.postUserAddress).toHaveBeenCalledWith({
      userId,
      ...dto,
    });
  });

  it('getUserAddresses', () => {
    userAddressesAppController.getUserAddresses(appUserAddressStub.userId);

    expect(userAddressesAppService.getUserAddresses).toHaveBeenCalledWith(
      appUserAddressStub.userId,
    );
  });

  it('putUserAddresses', () => {
    const id = appUserAddressStub.id;
    const userId = appUserAddressStub.userId;
    const dto = {
      isDefault: false,
      address: {
        zipcode: '55555',
        address: '서울시 강남구 양재동 *********',
      },
    };

    userAddressesAppController.putUserAddress(userId, id, dto);

    expect(userAddressesAppService.putUserAddress).toHaveBeenCalledWith({
      id,
      userId,
      ...dto,
    });
  });

  it('deleteUserAddresses', () => {
    const id = appUserAddressStub.id;
    const userId = appUserAddressStub.userId;

    userAddressesAppController.deleteUserAddress(userId, id);

    expect(userAddressesAppService.deleteUserAddress).toHaveBeenCalledWith({
      userId,
      id,
    });
  });
});
