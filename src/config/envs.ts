import * as joi from 'joi';
import 'dotenv/config';

interface EnvsSchema {
  PORT: number;
  NAT_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NAT_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NAT_SERVERS: process.env.NAT_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvsSchema = {
  PORT: value.PORT,
  NAT_SERVERS:value.NAT_SERVERS,
};
