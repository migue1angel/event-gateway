import * as joi from 'joi';
import 'dotenv/config';

interface EnvsSchema {
  PORT: number;
  NAT_SERVERS: string[];
  GOOGLE_CLIENT_ID: string;
  GOOGLE_SECRET: string;
  CLOUD_NAME: string;
  CLOUDINARY_SECRET: string;
  CLOUDINARY_KEY: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NAT_SERVERS: joi.array().items(joi.string()).required(),
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_SECRET: joi.string().required(),
    CLOUD_NAME: joi.string().required(),
    CLOUDINARY_SECRET: joi.string().required(),
    CLOUDINARY_KEY: joi.string().required(),
    
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
  NAT_SERVERS: value.NAT_SERVERS,
  GOOGLE_CLIENT_ID: value.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: value.GOOGLE_SECRET,
  CLOUD_NAME: value.CLOUD_NAME,
  CLOUDINARY_SECRET: value.CLOUDINARY_SECRET,
  CLOUDINARY_KEY: value.CLOUDINARY_KEY,
};
