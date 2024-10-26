import { IsEnum, IsString } from "class-validator";

type TypeMedication = 'comprimido' | 'liquido'

export class CreateMedicationDto {
    @IsString()
    name: string;

    @IsString()
    dosage: string;

    @IsString()
    brandName: string;
    
    @IsString()
    type: TypeMedication;

    @IsString()
    totalQuantity: string;

    @IsString()
    formOfUse: string;
}
