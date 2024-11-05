import { Inject, Injectable } from '@nestjs/common';
import { CreateTreatmentTrackingDto } from './dto/create-treatment_tracking.dto';
import { UpdateTreatmentTrackingDto } from './dto/update-treatment_tracking.dto';
import { treatment_trackings } from 'src/database/schemas/schema';
import { ResponseDto } from 'src/dto/response.dto';
import { GetResponseDto } from './dto/response-get-treatment_tracking.dto';
import { and, eq, isNull } from 'drizzle-orm';

@Injectable()
export class TreatmentTrackingsService {
  constructor(@Inject('DATABASE_CONNECTION') private db) {}
  
  async create(createTreatmentTrackingDto: CreateTreatmentTrackingDto): Promise<ResponseDto> {

    await this.db.insert(treatment_trackings)
    .values({
      prescriptionId: createTreatmentTrackingDto.prescriptionId,
      dateTracking: createTreatmentTrackingDto.dateTracking,
      status: createTreatmentTrackingDto.status,
      brandName: createTreatmentTrackingDto.brandName,
      type: createTreatmentTrackingDto.type,
      totalQuantity: createTreatmentTrackingDto.totalQuantity,
      formOfUse: createTreatmentTrackingDto.formOfUse
    }).execute()

    return {
      status: 200, 
      message: 'Tratment tracking created sucessfully'
    }
    
  }

  async findAll() : Promise<GetResponseDto> {
    const res = await this.db.select({
      id: treatment_trackings.id,
      prescriptionId: treatment_trackings.prescriptionId,
      dateTracking: treatment_trackings.dateTracking,
      status: treatment_trackings.status,
      brandName: treatment_trackings.brandName,
      type: treatment_trackings.type,
      totalQuantity: treatment_trackings.totalQuantity,
      formOfUse: treatment_trackings.formOfUse
    }).from(treatment_trackings)
    .where(isNull(treatment_trackings.deletedAt)).execute()

    return {
      status: 200,
      data: res
    };
  }

  async findById(id: number): Promise<GetResponseDto> {
    const res = await this.db.select({
      id: treatment_trackings.id,
      prescriptionId: treatment_trackings.prescriptionId,
      dateTracking: treatment_trackings.dateTracking,
      status: treatment_trackings.status,
      brandName: treatment_trackings.brandName,
      type: treatment_trackings.type,
      totalQuantity: treatment_trackings.totalQuantity,
      formOfUse: treatment_trackings.formOfUse
    }).from(treatment_trackings)
    .where(and(eq(treatment_trackings.id, id),isNull(treatment_trackings.deletedAt))).execute()

    return {
      status: 200,
      data: res
    };
   
  }

  async update(id: number, updateTreatmentTrackingDto: UpdateTreatmentTrackingDto): Promise<ResponseDto> {

    const [res] = await this.db.select({
      id: treatment_trackings.id,
      prescriptionId: treatment_trackings.prescriptionId,
      dateTracking: treatment_trackings.dateTracking,
      status: treatment_trackings.status,
      brandName: treatment_trackings.brandName,
      type: treatment_trackings.type,
      totalQuantity: treatment_trackings.totalQuantity,
      formOfUse: treatment_trackings.formOfUse
    }).from(treatment_trackings)
    .where(and(eq(treatment_trackings.id, id),isNull(treatment_trackings.deletedAt))).execute()

    if(!res){
      return {
        status: 404,
        message: 'Tratment tracking not found'
      }
    }

    await this.db.update(treatment_trackings)
    .set({
      prescriptionId: updateTreatmentTrackingDto.prescriptionId ? updateTreatmentTrackingDto.prescriptionId : res.prescriptionId,
      dateTracking: updateTreatmentTrackingDto.dateTracking ? updateTreatmentTrackingDto.dateTracking : res.dateTracking,
      status: updateTreatmentTrackingDto.status ? updateTreatmentTrackingDto.status : res.status,
      brandName: updateTreatmentTrackingDto.brandName ? updateTreatmentTrackingDto.brandName : res.brandName,
      totalQuantity: updateTreatmentTrackingDto.totalQuantity ? updateTreatmentTrackingDto.totalQuantity : res.totalQuantity,
      formOfUse: updateTreatmentTrackingDto.formOfUse ? updateTreatmentTrackingDto.formOfUse : res.alertRepurchase,
      updatedAt: new Date()
    }).where(and(eq(treatment_trackings.id, id), isNull(treatment_trackings.deletedAt)))
    .execute()


    return {
      status: 200,
      message: 'Treatment tracking updated sucessfully'
    }
  }

  async remove(id: number): Promise<ResponseDto> {

    await this.db.update(treatment_trackings)
    .set({
     deletedAt: new Date()
    }).where(and(eq(treatment_trackings.id, id), isNull(treatment_trackings.deletedAt)))
    .execute()


    return {
      status: 200,
      message: 'Treatment tracking deleted sucessfully'
    }

    
  }
}
