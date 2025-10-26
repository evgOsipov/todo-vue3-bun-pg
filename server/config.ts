import { SQL } from 'bun';

export const dbConfig: SQL.Options = {
  adapter: 'postgres',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'postgres',
  hostname: process.env.DB_HOST || 'localhost',
}

export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET || 'jwt_access_secret',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'jwt_refresh_secret',
}

export const appConfig = {
  port: process.env.APP_PORT || 5432,
}
