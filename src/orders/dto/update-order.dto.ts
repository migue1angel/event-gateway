import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  paid?: boolean;
}

