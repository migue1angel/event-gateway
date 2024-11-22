import * as joi from 'joi';
import 'dotenv/config';

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    EMAIL_MS_PORT: joi.number().required(),
    EVENT_MS_PORT: joi.number().required(),
    AUTH_MS_PORT: joi.number().required(),
    PAYMENT_MS_PORT: joi.number().required(),
    EMAIL_MS_HOST: joi.string().required(),
    EVENT_MS_HOST: joi.string().required(),
    AUTH_MS_HOST: joi.string().required(),
    PAYMENT_MS_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value: envVars } = envsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation errors:${error.message}`);
}

export const envs = {
  port: envVars.PORT,
  EMAIL_MS_PORT: envVars.EMAIL_MS_PORT,
  EVENT_MS_PORT: envVars.EVENT_MS_PORT,
  AUTH_MS_PORT: envVars.AUTH_MS_PORT,
  PAYMENT_MS_PORT: envVars.PAYMENT_MS_PORT,
  EMAIL_MS_HOST: envVars.EMAIL_MS_HOST,
  EVENT_MS_HOST: envVars.EVENT_MS_HOST,
  AUTH_MS_HOST: envVars.AUTH_MS_HOST,
  PAYMENT_MS_HOST: envVars.PAYMENT_MS_HOST,
};
