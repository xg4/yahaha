require('dotenv').config();

const url = process.env.DATABASE_URL;
const dbConfig = url
  ? {
      url,
    }
  : {
      host: process.env.DB_URL || 'db',
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'yahaha',
    };

/** @type {import('typeorm').ConnectionOptions} */
module.exports = {
  type: 'postgres',
  ...dbConfig,
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  ssl: process.env.IS_HEROKU
    ? {
        rejectUnauthorized: false,
      }
    : false,
  entities: ['server/models/**/*.ts'],
  migrations: ['db/migrations/**/*.ts'],
  subscribers: ['server/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'server/models',
    migrationsDir: 'db/migrations',
    subscribersDir: 'server/subscriber',
  },
};
