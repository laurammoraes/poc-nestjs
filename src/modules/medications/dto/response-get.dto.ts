import { PartialType } from "@nestjs/mapped-types";
import { CreateMedicationDto } from "./create-medication.dto";

export class ResponseGetMedicationsDto extends PartialType(CreateMedicationDto) {
    
}
