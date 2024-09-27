import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PostAuthAppRequestDto, PostAuthSignUpAppReqDto } from './auth.app.dto';
import { AuthService } from '@domain/domain/auth/auth.service';
import { AppUser } from '@domain/domain/app/user';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

@Injectable()
export class AuthAppService {
  constructor(private readonly authService: AuthService) {}

  private appUsers: AppUser[] = [
    {
      id: 1,
      name: '홍길동',
      email: 'test@test.com',
      password: '1234',
    },
  ];

  signUp(dto: PostAuthSignUpAppReqDto) {
    if (dto.password !== dto.passwordConfirm) {
      throw new BadRequestException(ERROR_MESSAGES.PasswordConfirm);
    }

    const user = new AppUser();
    user.id = this.appUsers.length + 1;
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;

    this.appUsers.push(user);

    const payload = { sub: user.id, email: user.email, name: user.name };

    return this.authService.createToken(payload);
  }

  signIn(dto: PostAuthAppRequestDto) {
    const { email, password } = dto;

    const user = this.appUsers.find((user) => user.email === email);

    if (!user || password !== user.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, name: user.name };

    return this.authService.createToken(payload);
  }
}
