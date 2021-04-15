import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const defaultDB: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'queue',
  password: 'queue1337',
  database: 'bmstu_queue',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migration',
  },
  synchronize: false,
};

const deployDB: PostgresConnectionOptions = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migration',
  },
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export const ormConfig = {
  default: defaultDB,
  deploy: deployDB,
};
