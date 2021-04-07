import 'reflect-metadata';
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';

export const initDB = async () => {
  const connectionOptions = await getConnectionOptions();
  return createConnection({
    ...connectionOptions,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'yahaha',
    host: process.env.DB_URL || 'db',
    port: process.env.DB_PORT || 5432,
  } as ConnectionOptions);
};
