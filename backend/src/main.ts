import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';
import appConfig from './config/app.config';
import { ConfigType } from '@nestjs/config';

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(AppModule);
   const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

   app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
   app.setGlobalPrefix('/api/v1');
   app.enableCors({
      origin: [config.clientUrl!],
      credentials: true,
   });
   app.useStaticAssets(path.join(__dirname, '..', 'public'));

   await app.listen(config.port ?? 3000);
}
bootstrap().catch(console.error);
