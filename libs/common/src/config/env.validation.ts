import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
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

  @IsNumber()
  @IsNotEmpty()
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_SLAVE_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_SLAVE_PASSWORD: string;

  @IsNumber()
  @IsNotEmpty()
  DB_SLAVE_PORT: number;
}

export function validateEnv(config: Record<string, unknown>): EnvVariables {
  return dtoToInstance({ class: EnvVariables, dto: config });
}
