import * as joi from 'joi';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

const schema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid('production', 'staging', 'development', 'test'),
    DATABASE_URL: joi.string().required(),
    PORT: joi.number().allow('').optional(),
  })
  .options({ allowUnknown: true });

const { error, value } = schema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env, { abortEarly: false });

if (error) {
  const errorMessage = error.details.map((err) => err.message).join(', ');
  Logger.error('Error loading environment variables', errorMessage);
  process.exit(1);
}

export const Env = {
  NODE_ENV: value.NODE_ENV,
  PORT: Number(value.POS),
  DATABASE_URL: value.DATABASE_URL,
};
