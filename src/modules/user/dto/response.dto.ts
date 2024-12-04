import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ResponseDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  status: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
