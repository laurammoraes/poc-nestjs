import { Inject, Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { medications } from 'src/database/schemas/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { ResponseDto } from 'src/dto/response.dto';
import { ResponseGetMedicationsDto } from './dto/response-get.dto';



@Injectable()
export class MedicationsService {
  constructor(@Inject('DATABASE_CONNECTION') private db) {}

  async create(createMedicationDto: CreateMedicationDto): Promise<ResponseDto> {

    const [medication] = await this.db.select({id: medications.id})
    .from(medications)
    .where(and(eq(medications.name, createMedicationDto.name.toLowerCase()), eq(medications.brandName, createMedicationDto.brandName.toLowerCase()), eq(medications.dosage, createMedicationDto.dosage.toLowerCase()), isNull(medications.deletedAt)))
    .execute()
   
    if(medication){
      return {
        status: 409,
        message: "Medication exists in database"
      }
    }

    await this.db.insert(medications)
    .values({
      name: createMedicationDto.name.toLowerCase(),
      dosage: createMedicationDto.dosage.toLowerCase(),
      brandName: createMedicationDto.brandName.toLowerCase(),
      type: createMedicationDto.type,
      totalQuantity: createMedicationDto.totalQuantity,
      formOfUse: createMedicationDto.formOfUse
    }).execute()

    return {
      status: 200,
      message: 'Medication created sucessfully'
    }
  }

  async findAll():Promise<ResponseGetMedicationsDto[]> {

    const res = await this.db.select({
      name: medications.name,
      dosage: medications.dosage,
      brandName: medications.brandName,
      type: medications.type,
      totalQuantity: medications.totalQuantity,
      formOfUse: medications.formOfUse
    })
    .from(medications)
    .where(isNull(medications.deletedAt))
    .execute()


    return res;
  }

  async findOne(id: number): Promise<ResponseGetMedicationsDto> {
    const res = await this.db.select({
      name: medications.name,
      dosage: medications.dosage,
      brandName: medications.brandName,
      type: medications.type,
      totalQuantity: medications.totalQuantity,
      formOfUse: medications.formOfUse
    })
    .from(medications)
    .where(and(eq(medications.id, id), isNull(medications.deletedAt)))
    .execute()

    return res
  }

  

  async update(id: number, updateMedicationDto: UpdateMedicationDto): Promise<ResponseDto> {

    const medication = await this.findOne(id)

    if(!medication){
      return {
        status: 404,
        message: 'Medication not found'
      }
    }

    await this.db
    .update(medications)
    .set({
      name: updateMedicationDto.name ? updateMedicationDto.name.toLowerCase() : medication.name,
      dosage: updateMedicationDto.dosage ? updateMedicationDto.dosage.toLowerCase() : medication.dosage,
      brandName: updateMedicationDto.brandName ? updateMedicationDto.brandName.toLowerCase() : medication.brandName,
      type: updateMedicationDto.type ? updateMedicationDto.type : medication.type,
      totalQuantity: updateMedicationDto.totalQuantity ? updateMedicationDto.totalQuantity : medication.totalQuantity,
      formOfUse: updateMedicationDto.formOfUse ? updateMedicationDto.formOfUse : medication.formOfUse,
      updatedAt: new Date()
    })
    .where(and(eq(medications.id, id), isNull(medications.deletedAt)))
    .execute()

    return {
      status: 200,
      message: 'Medication updated sucessfully'
    };
  }

  async remove(id: number): Promise<ResponseDto> {

    const medication = await this.findOne(id)

    if(!medication){
      return {
        status: 404,
        message: 'Medication not found'
      }
    }

    await this.db
    .update(medications)
    .set({
      deletedAt: new Date()
    })
    .where(and(eq(medications.id, id), isNull(medications.deletedAt)))
    .execute()

    return {
      status: 200,
      message: 'Medication deleted sucessfully'
    };
  }
}
