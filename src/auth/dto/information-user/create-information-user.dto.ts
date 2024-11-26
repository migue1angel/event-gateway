import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInformationUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsString()
  @IsOptional()
  phone?: string;

}
