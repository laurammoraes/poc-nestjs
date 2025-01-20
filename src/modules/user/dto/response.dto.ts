import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ResponseDto {
  @ApiProperty()
  @IsInt({ message: 'Status must be a number' })
  @IsNotEmpty()
  readonly status: number;

  @ApiProperty()
  @IsString({ message: 'Message must be a string' })
  @IsNotEmpty()
  readonly message: string;
}
