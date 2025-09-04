import { registerAs } from '@nestjs/config';

export default registerAs('db.config', () => ({
   dbHost: process.env.DB_HOST,
   dbUsername: process.env.DB_USERNAME,
   dbPassword: process.env.DB_PASSWORD,
   dbPort: parseInt(process.env.DB_PORT ?? '3306', 10),
   dbName: process.env.DB_NAME,
}));
