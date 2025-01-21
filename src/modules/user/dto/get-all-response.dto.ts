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
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Phone must be a string' })
  @MaxLength(255)
  @Validate(ValidatePhone)
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

class PaginationDto {
  @ApiProperty()
  @IsInt({ message: 'Total must be a number' })
  @IsNotEmpty()
  readonly total: number;

  @ApiProperty()
  @IsInt({ message: 'Limit must be a number' })
  @IsNotEmpty()
  readonly limit: number;

  @ApiProperty()
  @IsInt({ message: 'Page must be a number' })
  @IsNotEmpty()
  readonly page: number;

  @ApiProperty()
  @IsInt({ message: 'TotalPages must be a number' })
  @IsNotEmpty()
  readonly totalPages: number;
}
export class GetAllResponseDto {
  @IsInt({ message: 'Status must be a number' })
  @IsNotEmpty()
  readonly status: number;

  @IsNotEmpty()
  readonly data: UserDto[];

  @IsNotEmpty()
  readonly pagination: PaginationDto;
}
