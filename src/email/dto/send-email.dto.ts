import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SendEmailDto {
  @IsArray()
  @IsEmail({}, { each: true })
  @ArrayNotEmpty()
  to: string[];

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
