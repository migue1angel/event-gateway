import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  payment_method_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  ticket_type_id: number;
}