import { registerAs } from '@nestjs/config';

export default registerAs('app.config', () => ({
   appName: process.env.APP_NAME,
   port: process.env.PORT,
}));
