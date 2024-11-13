import { IsInt, IsNotEmpty, IsString } from 'class-validator';

class UserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
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

export class GetResponseDto {
  @IsInt()
  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  data: UserDto;
}
