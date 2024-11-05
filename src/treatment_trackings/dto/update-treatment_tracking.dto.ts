import { PartialType } from '@nestjs/mapped-types';
import { CreateTreatmentTrackingDto } from './create-treatment_tracking.dto';

export class UpdateTreatmentTrackingDto extends PartialType(CreateTreatmentTrackingDto) {}
