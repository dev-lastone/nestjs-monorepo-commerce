import { userEmail, userName, userPassword } from '@common/constant/example';
import { CreateUserDto } from '@domain/user/dto/create-user.dto';

export const createUserDtoStub: CreateUserDto = {
  name: userName,
  email: userEmail,
  password: userPassword,
};
