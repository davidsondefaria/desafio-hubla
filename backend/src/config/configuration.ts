import * as Joi from 'joi';

import { getTypeOrmConfig } from './condig.db';

const emptyIn = (env) => {
  return Joi.alternatives().conditional(env, [
    {
      is: 'development',
      then: env === 'development' ? Joi.valid(null) : Joi.string().required(),
    },
    {
      is: 'test',
      then: env === 'test' ? Joi.valid(null) : Joi.string().required(),
    },
    {
      is: 'production',
      then: env === 'production' ? Joi.valid(null) : Joi.string().required(),
      otherwise: Joi.valid(),
    },
  ]);
};

export const schemaValidation = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),

  // Databases
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_TYPE: Joi.string().required(),

  // TypeORM
  SYNCHRONIZE: Joi.string().required(),
  AUTO_LOAD_ENTITIES: Joi.string().required(),
  ENTITIES: Joi.string().required(),
  MIGRATIONS_TABLE_NAME: Joi.string().required(),
  MIGRATIONS: Joi.string().required(),
});

export default () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE: getTypeOrmConfig(),
  };
};
