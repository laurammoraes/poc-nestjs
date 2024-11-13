import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { TreatmentTrackingsService } from './treatment_trackings.service';
import { CreateTreatmentTrackingDto } from './dto/create-treatment_tracking.dto';
import { UpdateTreatmentTrackingDto } from './dto/update-treatment_tracking.dto';
import { Response } from 'express';

@Controller('treatment-tracking')
export class TreatmentTrackingsController {
  constructor(private readonly treatmentTrackingsService: TreatmentTrackingsService) {}

  @Post()
  async create(@Body() createTreatmentTrackingDto: CreateTreatmentTrackingDto, @Res() response: Response) {
    try {
      const res = await this.treatmentTrackingsService.create(createTreatmentTrackingDto)

      return response.status(res.status).send(res.message)
    } catch (error) {
      console.log(error)
      
      return response.status(500).send('Internal server error')
    }
    
  }

  @Get()
  async findAll(@Res() response: Response) {

    try {
      const res = await this.treatmentTrackingsService.findAll()

      if(res.data.length === 0){
        return response.status(404).send('Tratment Tracking not found')
      }
      return response.status(res.status).send(res.data)
    } catch (error) {
      console.log(error)

      return response.status(500).send('Internal server error')
      
    }
    
  }

  @Get('/find-by-id')
  async findOne(@Query('id') id: string, @Res() response: Response) {
    try {
      const res = await this.treatmentTrackingsService.findById(+id)

      if(res.data.length === 0){
        return response.status(404).send('Tratment tracking not found')
      }

      return response.status(res.status).send(res.data)

    } catch (error) {
      console.log(error)

      return response.status(500).send('Internal server error')
      
    }
    
  }

  @Patch('/update-by-id')
  async update(@Query('id') id: string, @Body() updateTreatmentTrackingDto: UpdateTreatmentTrackingDto, @Res() response: Response) {
    try {
      const res = await this.treatmentTrackingsService.update(+id, updateTreatmentTrackingDto)

      return response.status(res.status).send(res.message)
      
    } catch (error) {
      console.log(error)
      return response.status(500).send('Internal server error')
      
    }
    
  }

  @Delete('/delete-by-id')
  async remove(@Query('id') id: string, @Res() response: Response) {
    try {
      const res = await this.treatmentTrackingsService.remove(+id)

      return response.status(res.status).send(res.message)
    } catch (error) {
      console.log(error)

      return response.status(500).send('Internal server error')
      
    }
  
  }
}
