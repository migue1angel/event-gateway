import { IsBoolean, IsDecimal, IsInt, isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateTicketTypeDto{
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsInt()
    @IsNotEmpty()
    disponibility: number;

    @IsDecimal()
    @IsNotEmpty()
    price: number;

    @IsBoolean()
    @IsNotEmpty()
    isAvailable: boolean;

    @IsNotEmpty()
    event:string;

}