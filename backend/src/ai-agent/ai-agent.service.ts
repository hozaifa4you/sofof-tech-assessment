import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class AiAgentService {
   constructor(private readonly groq: Groq) {}
}
