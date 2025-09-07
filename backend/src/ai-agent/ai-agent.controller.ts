import { JwtGuard } from '@/auth/guards/jwt.guard';
import {
   Body,
   Controller,
   HttpCode,
   HttpStatus,
   Post,
   UseGuards,
} from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';
import { SayHelloDto } from './dtos/say-hello.dto';
import { StartConversationDto } from './dtos/start-conversation.dto';
import { AuthUser } from '@/auth/decorators/auth-user.decorator';
import type { AuthUserType } from '@/types/auth-user';

@UseGuards(JwtGuard)
@Controller('ai-agent')
export class AiAgentController {
   constructor(private readonly aiAgentService: AiAgentService) {}

   @Post('say-hello')
   @HttpCode(HttpStatus.OK)
   public async getHello(@Body() sayHelloDto: SayHelloDto) {
      return this.aiAgentService.getHello(sayHelloDto);
   }

   @Post('start-conversation')
   @HttpCode(HttpStatus.OK)
   public async startConversation(
      @Body() prompt: StartConversationDto,
      @AuthUser() user: AuthUserType,
   ) {
      return this.aiAgentService.startConversation(user.id, prompt);
   }
}
