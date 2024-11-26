import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateTicketDto{
    @IsString()
    @IsNotEmpty()
    code: string;
    
    @IsBoolean()
    @IsNotEmpty()
    state: boolean;
    
    @IsDate()
    @IsNotEmpty()
    generatedDate: Date;
    
    @IsString()
    ticketType:string;
    
    @IsString()
    user:string;
    
    @IsString()
    event:string;


}