import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm';

import dotenv = require('dotenv');
dotenv.config();

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  const type: any = process.env.DATABASE_TYPE as DatabaseType;
  const entities = process.env.ENTITIES;
  const entitiesPath =
    process.env.NODE_ENV === 'test' ? __dirname + entities : entities;

  return {
    type,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,

    // logging: true,

    entities: [entitiesPath],

    migrationsTableName: process.env.MIGRATIONS_TABLE_NAME,

    migrations: [process.env.MIGRATIONS],

    ssl: process.env.SSL === 'true' ? true : false,
    synchronize: process.env.SYNCHRONIZE === 'true' ? true : false,
    autoLoadEntities: process.env.AUTO_LOAD_ENTITIES === 'true' ? true : false,
    name: 'default',
  };
};
