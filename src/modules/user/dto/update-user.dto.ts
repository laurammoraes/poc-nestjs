import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidatePhone } from './validate-phone.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(255)
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsString({ message: 'Email must be a string' })
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Phone must be a string' })
  @Validate(ValidatePhone)
  @MaxLength(255)
  @IsOptional()
  readonly phone: string;

  @ApiProperty()
  @IsString({ message: 'Date of birth must be a string' })
  @IsOptional()
  @MaxLength(255)
  readonly dateOfBirth: string;

  @ApiProperty()
  @IsString({ message: 'Address must be a string' })
  @IsOptional()
  readonly address: string;

  @ApiProperty()
  @IsString({ message: 'City must be a string' })
  @IsOptional()
  readonly city: string;

  @ApiProperty()
  @IsString({ message: 'State must be a string' })
  @IsOptional()
  readonly state: string;
}
