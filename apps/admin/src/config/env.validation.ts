import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

export class EnvVariables {
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRES_IN: string;
}

export function validateEnv(config: Record<string, unknown>): EnvVariables {
  const validatedConfig = plainToInstance(EnvVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorConstraints = errors.map((error) => {
      return error.constraints;
    });

    throw new Error(JSON.stringify(errorConstraints));
  }

  return validatedConfig;
}
