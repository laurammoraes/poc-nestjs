import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { response, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const create = await this.userService.create(createUserDto);

      return response.status(200).send(create.message);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const res = await this.userService.findAll();

      return response.status(200).json(res);
    } catch (error) {
      console.log(error);

      return response.status(500).send('Internal server error');
    }
  }

  @Get('/find-by-id')
  async findOneById(@Query('id') id: string, @Res() response: Response) {
    try {
      const res = await this.userService.findById(+id);

      return response.status(200).json(res);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }

  @Get('/find-by-phone')
  async findOne(@Query('phone') phone: string, @Res() response: Response) {
    try {
      const res = await this.userService.findByPhone(phone);

      return response.status(200).json(res);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }

  @Patch('/update-by-phone')
  async update(
    @Query('phone') phone: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    try {
      await this.userService.update(phone, updateUserDto);

      return response.status(200).send('User updated');
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }

  @Delete('/delete-by-phone')
  async remove(@Query('phone') phone: string, @Res() response: Response) {
    try {
      await this.userService.removeByPhone(phone);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }
}
