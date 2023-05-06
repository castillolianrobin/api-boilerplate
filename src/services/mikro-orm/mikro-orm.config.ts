import { Options } from '@mikro-orm/core';
import ENV from '../../constants/ENV';

const config: Options = {
  entities: ["dist/**/entities/**/*.js"],
  entitiesTs: ["src/**/entities/**/*.ts"],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  type: 'mysql',
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  dbName: ENV.DB_NAME,
  debug: ENV.NODE_ENV !== 'production',
  tsNode: ENV.NODE_ENV !== 'production',
};

export default config;