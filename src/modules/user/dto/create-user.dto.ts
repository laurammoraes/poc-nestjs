import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { ValidatePhone } from './validate-phone.dto';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(255)
  @Transform(({ value }) => value.toLowerCase())
  readonly name: string;

  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(255)
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(255)
  @Validate(ValidatePhone)
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(255)
  readonly dateOfBirth: string;

  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(255)
  @Transform(({ value }) => value.toLowerCase())
  readonly address: string;

  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(255)
  @Transform(({ value }) => value.toLowerCase())
  readonly city: string;

  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(255)
  @Transform(({ value }) => value.toLowerCase())
  readonly state: string;
}
