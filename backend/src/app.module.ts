import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from '@/config/app.config';
import dbConfig from '@/config/db.config';

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true, load: [appConfig, dbConfig] }),
      TypeOrmModule.forRootAsync({
         imports: [ConfigModule],
         inject: [dbConfig.KEY],
         useFactory: (config: ConfigType<typeof dbConfig>) => {
            return {
               type: 'mysql',
               host: config.dbHost!,
               port: config.dbPort,
               username: config.dbUsername!,
               password: config.dbPassword!,
               database: config.dbName!,
               entities: [__dirname + '/**/*entity{.ts,.js'],
               synchronize: process.env.NODE_ENV !== 'production',
               autoLoadEntities: true,
            };
         },
      }),
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
