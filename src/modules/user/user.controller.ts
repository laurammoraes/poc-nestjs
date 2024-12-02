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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Response } from 'express';
import { CreateUser } from './use-cases/create';
import { FindAllUsers } from './use-cases/findAll';
import { FindUserById } from './use-cases/findById';
import { RemoveUser } from './use-cases/remove';
import { UpdateUser } from './use-cases/update';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly findAllUsers: FindAllUsers, 
    private readonly findUserById: FindUserById, 
    private readonly removeUser: RemoveUser, 
    private readonly updateUser: UpdateUser
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const create = await this.createUser.execute(createUserDto);

      return response.status(200).send(create.message);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const res = await this.findAllUsers.execute();

      return response.status(200).json(res);
    } catch (error) {
      console.log(error);

      return response.status(500).send('Internal server error');
    }
  }

  @Get('/find-by-id')
  async findOneById(@Query('id') id: string, @Res() response: Response) {
    try {
      const res = await this.findUserById.execute(+id);

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
      
      await this.updateUser.execute(phone, updateUserDto);

      return response.status(200).send('User updated');
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }

  @Delete('/delete-by-phone')
  async remove(@Query('phone') phone: string, @Res() response: Response) {
    try {
      await this.removeUser.execute(phone);
      return response.status(200).send('User deleted sucessfully')
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }
}
