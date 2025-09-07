import { Module } from '@nestjs/common';
import { AiAgentController } from './ai-agent.controller';
import { AiAgentService } from './ai-agent.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import groqConfig from '@/config/groq.config';
import Groq from 'groq-sdk';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '@/todo/entities/todo.entity';
import { User } from '@/user/entities/user.entity';
import { AiAgentRepository } from './ai-agent.repository';

@Module({
   imports: [
      ConfigModule.forFeature(groqConfig),
      TypeOrmModule.forFeature([Todo, User]),
   ],
   controllers: [AiAgentController],
   providers: [
      AiAgentService,
      AiAgentRepository,
      {
         provide: Groq,
         inject: [groqConfig.KEY],
         useFactory: (config: ConfigType<typeof groqConfig>) =>
            new Groq({ apiKey: config.groqApiKey }),
      },
   ],
   exports: [AiAgentService, AiAgentRepository],
})
export class AiAgentModule {}
