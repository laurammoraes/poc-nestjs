import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { ValidatePhone } from './validate-phone.dto';

class UserDto {
  @ApiProperty()
  @IsInt({ message: 'Id must be a number' })
  @MaxLength(255)
  readonly id: number;

  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(255)
  readonly name: string;

  @ApiProperty()
  @IsString({ message: 'Email must be a string' })
  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Phone must be a string' })
  @Validate(ValidatePhone)
  @MaxLength(255)
  readonly phone: string;

  @ApiProperty()
  @IsString({ message: 'Date of birth must be a string' })
  @MaxLength(255)
  readonly date_of_birth: string;

  @ApiProperty()
  @IsString({ message: 'Address must be a string' })
  @MaxLength(255)
  readonly address: string;

  @ApiProperty()
  @IsString({ message: 'City must be a string' })
  @MaxLength(255)
  readonly city: string;

  @ApiProperty()
  @IsString({ message: 'State must be a string' })
  @MaxLength(255)
  readonly state: string;
}

export class GetResponseDto {
  @ApiProperty()
  @IsInt({ message: 'Status must be a number' })
  @IsNotEmpty()
  status: number;

  @ApiProperty()
  @IsNotEmpty()
  data: UserDto;
}
