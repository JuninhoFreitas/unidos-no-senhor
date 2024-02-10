import { ValidationPipeOptions } from '@nestjs/common';

export const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  validationError: { target: false },
};
