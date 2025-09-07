import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import { SayHelloDto } from './dtos/say-hello.dto';

@Injectable()
export class AiAgentService {
   constructor(private readonly groq: Groq) {}

   public async getHello(sayHelloDto: SayHelloDto) {
      const response = await this.groq.chat.completions.create({
         model: 'llama-3.3-70b-versatile',
         messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: sayHelloDto.prompt },
         ],
      });

      const message = response.choices[0].message;
      return message;
   }
}
