import { IsNotEmpty, IsString } from 'class-validator';
import { dtoToInstance } from '@common/util/dto-to-instance';

export class EnvVariables {
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_DATABASE: string;
}

export function validateEnv(config: Record<string, unknown>): EnvVariables {
  return dtoToInstance({ class: EnvVariables, dto: config });
}
