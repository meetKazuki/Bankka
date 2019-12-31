require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const devEnv = (env !== 'production');

const databaseURLs: any = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL,
  staging: process.env.DATABASE_URL,
  production: process.env.DATABASE_URL,
};

export const url: string = databaseURLs[env];

export const config = {
  dialect: 'postgres',
  logging: devEnv ? (log: boolean) => log : false,
};
