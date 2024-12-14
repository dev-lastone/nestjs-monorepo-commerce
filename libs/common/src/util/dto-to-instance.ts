import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export function dtoToInstance<T>(params: { class: new () => T; dto: any }): T {
  const instance = plainToInstance(params.class, params.dto, {
    enableImplicitConversion: true,
  });

  validate(instance);

  return instance;
}

function validate(instance: any) {
  const errors = validateSync(instance, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorConstraints = errors.map((error) => {
      return error.constraints;
    });

    throw new Error(JSON.stringify(errorConstraints));
  }
}
