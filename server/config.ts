import { SQL } from 'bun';

export const dbConfig: SQL.Options = {
  adapter: 'postgres',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'postgres',
  hostname: process.env.DB_HOST || 'localhost',
}
