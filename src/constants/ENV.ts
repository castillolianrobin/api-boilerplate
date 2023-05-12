import 'dotenv/config';


export default {
  // App
  APP_NAME: process.env.APP_VARIABLES as string,
  APP_URL: process.env.APP_URL as string,
  CLIENT_URL: process.env.CLIENT_URL || 'https://component-kits-vue3.netlify.app/',
  NODE_ENV: process.env.NODE_ENV || 'development',
  // Database
  DB_HOST: process.env.DB_HOST as string,
  DB_PORT: (process.env.DB_PORT || 3306) as number,
  DB_USER: process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_NAME: process.env.DB_NAME as string,
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'local_secret',
  // SMTP
  SMTP_HOST: process.env.SMTP_HOST || 'localhost',
  SMTP_PORT: (process.env.SMTP_PORT || 2525) as number,
  SMTP_USER: process.env.SMTP_USER || '1e0c9ac5b8bd16',
  SMTP_PASS: process.env.SMTP_PASS || '13bfb6c683a80e',
}