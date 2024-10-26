import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Injectable()
export class PrescriptionsService {
  constructor(@Inject('DATABASE_CONNECTION') private db) {}
  
  async create(createPrescriptionDto: CreatePrescriptionDto) {
    await this.d
   
    return 'This action adds a new prescription';
  }

  findAll() {
    return `This action returns all prescriptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prescription`;
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return `This action updates a #${id} prescription`;
  }

  remove(id: number) {
    return `This action removes a #${id} prescription`;
  }
}
