import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class BaseEntity {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    createdAt: string;

    @IsString()
    @IsNotEmpty()
    updatedAt: string;

    @IsString()
    @IsOptional()
    deletedAt: string;

}