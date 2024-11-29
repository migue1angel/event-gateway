import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateSponsorDto } from '../sponsor/create-sponsor.dto';
import { CreateAddressDto } from '../address/create-address.dto';
import {  Type } from 'class-transformer';
import { CreateTicketTypeDto } from '../ticket_type/create-ticket-type.dto';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  // @IsDate() //todo: add validation
  startDate: Date;

  @IsNotEmpty()
  // @IsDate()
  endDate: Date;

  @IsNotEmpty()
  status: string;
  
  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;
  
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  organizer: string;

  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsBoolean()
  hasSponsors: boolean;

  @IsOptional()
  sponsors?: CreateSponsorDto[];

  @IsNotEmpty()
  @Type(() => CreateTicketTypeDto)
  ticket_types?: CreateTicketTypeDto[];
}
