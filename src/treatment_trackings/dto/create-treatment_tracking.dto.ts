import { IsString } from "class-validator";

export class CreateTreatmentTrackingDto {
    @IsString()
    prescriptionId: string;

    @IsString()
    dateTracking: string;

    @IsString()
    status: string;

    @IsString()
    brandName: string;

    @IsString()
    type: string;

    @IsString()
    totalQuantity: string;

    @IsString()
    formOfUse: string;
}
