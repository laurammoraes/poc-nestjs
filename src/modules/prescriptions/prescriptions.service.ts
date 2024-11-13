import { Inject, Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { prescriptions } from 'src/database/schemas/schema';
import { ResponseDto } from 'src/dto/response.dto';
import { and, eq, isNull } from 'drizzle-orm';
import { GetResponseDto } from './dto/response-get-prescription.dto';

@Injectable()
export class PrescriptionsService {
  constructor(@Inject('DATABASE_CONNECTION') private db) {}
  
  async create(createPrescriptionDto: CreatePrescriptionDto): Promise<ResponseDto> {
    await this.db.insert(prescriptions).values({
      userId: createPrescriptionDto.userId,
      type: createPrescriptionDto.type,
      medicationId: createPrescriptionDto.medicationId,
      dosageFrequency: createPrescriptionDto.dosageFrequency,
      totalQuantity: createPrescriptionDto.totalQuantity,
      alertRepurchase: createPrescriptionDto.alertRepurchase,
      dateInit: createPrescriptionDto.dateInit,
      dateEnd: createPrescriptionDto.dateEnd,
    }).execute()

    return {
      status: 200,
      message: 'User created sucefully',
    };
   
  }

  async findAll(): Promise<GetResponseDto> {
    const res = await this.db.select({
      id: prescriptions.id,
      userId: prescriptions.userId,
      type: prescriptions.type,
      medicationId: prescriptions.medicationId,
      dosageFrequency: prescriptions.dosageFrequency,
      totalQuantity: prescriptions.totalQuantity,
      alertRepurchase: prescriptions.alertRepurchase,
      dateInit: prescriptions.dateInit,
      dateEnd: prescriptions.dateEnd
    }).from(prescriptions).where(isNull(prescriptions.deletedAt))
    .execute()

   
    return {
      status: 200, 
      data: res
    }
  }

  async findById(id: number): Promise<GetResponseDto>{

    const res = await this.db.select({
      id: prescriptions.id,
      userId: prescriptions.userId,
      type: prescriptions.type,
      medicationId: prescriptions.medicationId,
      dosageFrequency: prescriptions.dosageFrequency,
      totalQuantity: prescriptions.totalQuantity,
      alertRepurchase: prescriptions.alertRepurchase,
      dateInit: prescriptions.dateInit,
      dateEnd: prescriptions.dateEnd
    }).from(prescriptions).where(and(eq(prescriptions.id, id), isNull(prescriptions.deletedAt)))
    .execute()


     return {
      status: 200, 
      data: res
    }
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) : Promise<ResponseDto> {

    const [res] = await this.db.select({
      id: prescriptions.id,
      userId: prescriptions.userId,
      type: prescriptions.type,
      medicationId: prescriptions.medicationId,
      dosageFrequency: prescriptions.dosageFrequency,
      totalQuantity: prescriptions.totalQuantity,
      alertRepurchase: prescriptions.alertRepurchase,
      dateInit: prescriptions.dateInit,
      dateEnd: prescriptions.dateEnd
    }).from(prescriptions).where(and(eq(prescriptions.id, id), isNull(prescriptions.deletedAt)))
    .execute()

    if(!res){
      return {
        status: 404,
        message: 'Prescrition not found'
      }
    }

    await this.db.update(prescriptions)
    .set({
      userId: updatePrescriptionDto.userId ? updatePrescriptionDto.userId : res.userId,
      type: updatePrescriptionDto.type ? updatePrescriptionDto.type : res.type,
      medicationId: updatePrescriptionDto.medicationId ? updatePrescriptionDto.medicationId : res.medicationId,
      dosageFrequency: updatePrescriptionDto.dosageFrequency ? updatePrescriptionDto.dosageFrequency : res.dosageFrequency,
      totalQuantity: updatePrescriptionDto.totalQuantity ? updatePrescriptionDto.totalQuantity : res.totalQuantity,
      alertRepurchase: updatePrescriptionDto.alertRepurchase ? updatePrescriptionDto.alertRepurchase : res.alertRepurchase,
      dateInit: updatePrescriptionDto.dateInit ? updatePrescriptionDto.dateInit : res.dateInit,
      dateEnd: updatePrescriptionDto.dateEnd ? updatePrescriptionDto.dateEnd : res.dateEnd,
      updatedAt: new Date()
    }).from(prescriptions).where(and(eq(prescriptions.id, id), isNull(prescriptions.deletedAt)))
    .execute()

    return {
      status: 200,
      message: 'Prescription updated sucessfully'
    }
  }

  async remove(id: number) : Promise<ResponseDto> {

    const [res] = await this.db.select({
      id: prescriptions.id,
      userId: prescriptions.userId,
      type: prescriptions.type,
      medicationId: prescriptions.medicationId,
      dosageFrequency: prescriptions.dosageFrequency,
      totalQuantity: prescriptions.totalQuantity,
      alertRepurchase: prescriptions.alertRepurchase,
      dateInit: prescriptions.dateInit,
      dateEnd: prescriptions.dateEnd
    }).from(prescriptions).where(and(eq(prescriptions.id, id), isNull(prescriptions.deletedAt)))
    .execute()

    if(!res){
      return {
        status: 404,
        message: 'Prescrition not found'
      }
    }

    await this.db.update(prescriptions)
    .set({
      deletedAt: new Date()
    }).from(prescriptions).where(and(eq(prescriptions.id, id), isNull(prescriptions.deletedAt)))
    .execute()
    
    return {
      status: 200,
      message: 'Prescription deleted sucessfully'
    }

  }
}
