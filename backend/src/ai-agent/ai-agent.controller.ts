import { JwtGuard } from '@/auth/guards/jwt.guard';
import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   UseGuards,
} from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';
import { SayHelloDto } from './dtos/say-hello.dto';

@UseGuards(JwtGuard)
@Controller('ai-agent')
export class AiAgentController {
   constructor(private readonly aiAgentService: AiAgentService) {}

   @Get('say-hello')
   @HttpCode(HttpStatus.OK)
   public async getHello(@Body() sayHelloDto: SayHelloDto) {
      return this.aiAgentService.getHello(sayHelloDto);
   }
}
