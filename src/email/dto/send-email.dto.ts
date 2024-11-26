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
  @ArrayNotEmpty({message:'To field should have at least one email'})
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
