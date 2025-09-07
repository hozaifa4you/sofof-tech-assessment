import { IsString, Length } from 'class-validator';

export class SayHelloDto {
   @IsString()
   @Length(10, 100)
   prompt: string;
}
