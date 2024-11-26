import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateRegistrationDto{
    
    
    @IsBoolean()
    @IsNotEmpty()
    attended:boolean;

    @IsNotEmpty()
    event:string;

    @IsNotEmpty()
    user:string;

}
