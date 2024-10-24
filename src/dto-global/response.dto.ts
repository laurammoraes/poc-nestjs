import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class ResponseDto {
    @IsInt()
    @IsNotEmpty()
    status: number;

    @IsString()
    @IsNotEmpty()
    message: string;
    
}