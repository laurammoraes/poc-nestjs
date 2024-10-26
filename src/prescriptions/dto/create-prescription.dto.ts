import { IsDate, IsNumber, IsString } from "class-validator";

export class CreatePrescriptionDto {
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
