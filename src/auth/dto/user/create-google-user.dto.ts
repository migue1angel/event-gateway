import { IsEmail, IsNotEmpty } from "class-validator";
import { CreateInformationUserDto } from "../information-user/create-information-user.dto";

export class CreateUserFromGoogleDto {
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    informationUser: CreateInformationUserDto;
}
