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
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly findAllUsers: FindAllUsers,
    private readonly findUserById: FindUserById,
    private readonly removeUser: RemoveUser,
    private readonly updateUser: UpdateUser,
  ) {}

  @Post()
  @ApiResponse({ status: 200, description: 'User created successfully' })
  @ApiResponse({
    status: 409,
    description: 'Phone number exists in our database',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const create = await this.createUser.execute(createUserDto);

      if (create.status === 409) {
        return response.status(409).send(create.message);
      }

      return response.status(200).send(create.message);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return array with users' })
  @ApiResponse({
    status: 404,
    description: 'No user found',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll(@Res() response: Response) {
    try {
      const res = await this.findAllUsers.execute();

      if (res.status === 404) {
        return response.status(404).send('No user found');
      }

      return response.status(200).json(res);
    } catch (error) {
      console.log(error);

      return response.status(500).send('Internal server error');
    }
  }

  @Get('/find-by-id')
  @ApiResponse({ status: 200, description: 'Return array with user' })
  @ApiResponse({
    status: 404,
    description: 'No user found',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOneById(@Query('id') id: string, @Res() response: Response) {
    try {
      const res = await this.findUserById.execute(+id);

      if (res.status === 404) {
        return response.status(404).send('No user found');
      }

      return response.status(200).json(res);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }

  @Patch('/update-by-phone')
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({
    status: 404,
    description: 'No user found',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(
    @Query('phone') phone: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    try {
      const res = await this.updateUser.execute(phone, updateUserDto);

      if (res.status === 404) {
        return response.status(404).send('No user found');
      }

      return response.status(200).send(res.message);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }

  @Delete('/delete-by-phone')
  @ApiResponse({ status: 200, description: 'User deleted sucessfully' })
  @ApiResponse({
    status: 404,
    description: 'No user found',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Query('phone') phone: string, @Res() response: Response) {
    try {
      const res = await this.removeUser.execute(phone);

      if (res.status === 404) {
        return response.status(404).send(res.message);
      }

      return response.status(200).send(res.message);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Internal server error');
    }
  }
}
