import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Response } from 'express';


@Controller('medication')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  async create(@Body() createMedicationDto: CreateMedicationDto, @Res() response: Response) {
    try {
      const res = await this.medicationsService.create(createMedicationDto)

      response.status(res.status).send(res.message)
    } catch (error) {
      console.log(error)
      response.status(500).send('Internal server error')
      
    }
    return this.medicationsService.create(createMedicationDto);
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const res = await this.medicationsService.findAll()

      if(res.length === 0 ){
        return response.status(404).send('Medication not found')
      }

      return response.status(200).send(res)
    } catch (error) {
      console.log(error)
      return response.status(500).send('Internal server error')
    }
   
  }

  @Get('/find-by-id')
  async findOne(@Query('id') id: string, @Res() response: Response) {
    try {
      const res = await this.medicationsService.findOne(+id)
      
      if(!res){
        return response.status(404).send('Medication not found')
      }

      return response.status(200).send(res)
    } catch (error) {
      console.log(error)
      return response.status(500).send('Internal server error')
    }
    
  }

  @Patch('/update-by-id')
  async update(@Query('id') id: string, @Body() updateMedicationDto: UpdateMedicationDto, @Res() response: Response) {
    try {
      await this.medicationsService.update(+id, updateMedicationDto)

      return response.status(200).send('Medication updated sucessfully')
    } catch (error) {
      console.log(error)
      return response.status(500).send('Internal server error')
    }
    
  }

  @Delete('/delete-by-id')
  async remove(@Query('id') id: string, @Res() response: Response) {
    try {

      await this.medicationsService.remove(+id)

      return response.status(200).send('Medication deleted sucessfully')
      
    } catch (error) {
      console.log(error)
      return response.status(500).send('Internal server error')
    }
  
  }
}
