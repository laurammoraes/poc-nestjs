import { PartialType } from "@nestjs/mapped-types";
import { CreateTreatmentTrackingDto } from "./create-treatment_tracking.dto";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

class TreatmentTrackingDto extends PartialType(CreateTreatmentTrackingDto){
    @IsString()
    id: string
}

export class GetResponseDto  {
    @IsInt()
    @IsNotEmpty()
    status: number;
  
    @IsNotEmpty()
    data: TreatmentTrackingDto[];
}
