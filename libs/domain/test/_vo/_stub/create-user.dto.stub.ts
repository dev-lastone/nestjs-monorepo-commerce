import { userEmail, userName, userPassword } from '@common/constant/example';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';

export const createUserDtoStub: CreateUserDto = {
  name: userName,
  email: userEmail,
  password: userPassword,
};
