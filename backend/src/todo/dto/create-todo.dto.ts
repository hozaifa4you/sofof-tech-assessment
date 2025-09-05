import {
   IsDateString,
   IsNotEmpty,
   IsOptional,
   IsString,
   MaxLength,
} from 'class-validator';
import { IsImageFile } from '../../common/validators/file.validator';

export class CreateTodoDto {
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   title: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(190)
   description: string;

   @IsDateString()
   @IsNotEmpty()
   date: Date;

   @IsString()
   @IsNotEmpty()
   priority: 'low' | 'medium' | 'high';

   @IsString()
   @IsNotEmpty()
   status: 'pending' | 'in_progress' | 'done' | 'canceled';

   @IsOptional()
   @IsImageFile()
   image?: any;
}
