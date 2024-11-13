import { Test } from '@nestjs/testing';
import { UserAddressesAppController } from '../../addresses/user-addresses.app.controller';
import { UserAddressesAppService } from '../../addresses/user-addresses.app.service';
import { userAddressStub } from '@domain/app-user/address/__stub/user-address.stub';

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
    const userId = 2;
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
    userAddressesAppController.getUserAddresses(userAddressStub.userId);

    expect(userAddressesAppService.getUserAddresses).toHaveBeenCalledWith(
      userAddressStub.userId,
    );
  });

  it('putUserAddresses', () => {
    const id = userAddressStub.id;
    const userId = userAddressStub.userId;
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
    const id = userAddressStub.id;
    const userId = userAddressStub.userId;

    userAddressesAppController.deleteUserAddress(userId, id);

    expect(userAddressesAppService.deleteUserAddress).toHaveBeenCalledWith(
      userId,
      id,
    );
  });
});
