import { IsString, Length } from 'class-validator';

export class StartConversationDto {
   @IsString()
   @Length(10, 150)
   prompt: string;
}
