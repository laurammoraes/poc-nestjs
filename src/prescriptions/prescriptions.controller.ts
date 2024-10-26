import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Response } from 'express';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  async create(@Body() createPrescriptionDto: CreatePrescriptionDto, @Res() response: Response) {
    try {
      const res = await this.prescriptionsService.create(createPrescriptionDto)

      return response.status(res.status).send(res.message)
    } catch (error) {
      console.log(error)

      return response.status(500).send('Internal server error')
      
    }
   
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const res = await this.prescriptionsService.findAll()

      return response.status(res.status).send(res.message)
    } catch (error) {
      console.log(error)

      return response.status(500).send('Internal server error')
      
    }
  }

  @Get('/find-by-id')
  async findOne(@Query('id') id: string, @Res() response: Response) {
    try {
      const res = await this.prescriptionsService.findOne(+id)

      if(res.status === 409){
        return response.status(res.status).send(res.message)
      }

      return response.status(200).send(res)
    } catch (error) {
      console.log(error)

      return response.status(500).send('Internal server error')
      
    }
  }

  @Patch('/update-by-id')
  async update(@Query('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto, @Res() response: Response) {
    try {
      const res = await this.prescriptionsService.update(+id, updatePrescriptionDto)

      if(res.status === 409){
        return response.status(res.status).send(res.message)
      }

      return response.status(res.status).send(res.message)
    } catch (error) {
      console.log(error)

      return response.status(500).send('Internal server error')
      
    }
  }

  @Delete('/delete-by-id')
  async remove(@Query('id') id: string, @Res() response: Response) {
    try {
      const res = await this.prescriptionsService.remove(+id)

      return response.status(res.status).send(res.message)
    } catch (error) {
      console.log(error)

      return response.status(500).send('Internal server error')
      
    }
  }
}
