import {
   IsEmail,
   IsNotEmpty,
   IsOptional,
   IsPhoneNumber,
   IsString,
   Length,
   MaxLength,
} from 'class-validator';

export class CreateUserDto {
   @IsString()
   @IsNotEmpty()
   @MaxLength(32)
   name: string;

   @IsString()
   @IsNotEmpty()
   @IsEmail()
   @MaxLength(32)
   email: string;

   @IsString()
   @IsOptional()
   @IsPhoneNumber()
   @MaxLength(32)
   phone: string;

   @IsString()
   @IsNotEmpty()
   @Length(8, 32)
   password: string;
}
