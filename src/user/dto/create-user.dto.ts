import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    dateOfBirth: string;

    @IsString()
    address: string;

    @IsString()
    city: string;

    @IsString()
    state: string;
}
