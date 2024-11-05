import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class PrescriptionDto {
  @IsInt()
  id: number;

  @IsString()
  userId: string;

  @IsString()
  type:string;

  @IsString()
  medicationId: string;

  @IsNumber()
  dosageFrequency: number;

  @IsNumber()
  totalQuantity: number;

  @IsNumber()
  alertRepurchase: number;

  @IsDate()
  dateInit: Date;

  @IsDate()
  dateEnd: Date;
}

export class GetResponseDto {
  @IsInt()
  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  data: PrescriptionDto[];
}
