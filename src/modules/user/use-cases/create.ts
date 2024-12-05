import { BaseService } from 'src/base/base.service';
import { UserService } from '../user.service';
import { users } from 'src/database/schemas/schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseDto } from 'src/modules/user/dto/response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUser {
  constructor(
    private readonly userService: UserService,
    private readonly baseService: BaseService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<ResponseDto> {
    const validatePhone = await this.userService.validatePhoneOnDatabase(
      createUserDto.phone,
    );

    if (validatePhone) {
      return {
        status: 409,
        message: 'Phone number exists in our database',
      };
    }

    await this.baseService.create(createUserDto, users);

    return {
      status: 200,
      message: 'User created successfully',
    };
  }
}
