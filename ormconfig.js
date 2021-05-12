require('dotenv').config();

/** @type {import('typeorm').ConnectionOptions} */
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  entities: ['server/models/**/*.ts'],
  migrations: ['db/migrations/**/*.ts'],
  subscribers: ['server/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'server/models',
    migrationsDir: 'db/migrations',
    subscribersDir: 'server/subscriber',
  },
};
