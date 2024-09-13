import { ApiProperty } from '@nestjs/swagger';

export class User {
  id: number;
  name: string;
  @ApiProperty({ default: 'test@test.com' })
  email: string;
  @ApiProperty({ default: '1234' })
  password: string;
}
