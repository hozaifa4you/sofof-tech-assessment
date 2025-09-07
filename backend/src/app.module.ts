import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CalendarModule } from './calendar/calendar.module';
import { AiAgentModule } from './ai-agent/ai-agent.module';
import appConfig from '@/config/app.config';
import dbConfig from '@/config/db.config';
import jwtConfig from './config/jwt.config';
import groqConfig from '@/config/groq.config';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         load: [appConfig, dbConfig, jwtConfig, groqConfig],
      }),
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
      TodoModule,
      AuthModule,
      UserModule,
      AnalyticsModule,
      CalendarModule,
      AiAgentModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
