import { PartialType } from "@nestjs/mapped-types";
import { CreateAddressDto } from "./create-address.dto";

export class UpdateAddresDto extends PartialType(CreateAddressDto){}