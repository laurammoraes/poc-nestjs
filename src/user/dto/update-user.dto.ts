import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {  IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    dateOfBirth: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    state: string;
}
