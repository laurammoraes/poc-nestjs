import { BaseService } from 'src/base/base.service';
import { UserService } from '../user.service';
import { ResponseDto } from 'src/modules/user/dto/response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { users } from 'src/database/schemas/schema_ols';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUser {
  constructor(
    private readonly userService: UserService,
    private readonly baseService: BaseService,
  ) {}

  async execute(
    phone: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseDto> {
    const validatePhone = await this.userService.validatePhoneOnDatabase(phone);

    if (validatePhone) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    const user = await this.userService.findByPhone(phone);

    const data = {
      name: updateUserDto.name ? updateUserDto.name : user.data[0].name,
      email: updateUserDto.email ? updateUserDto.email : user.data[0].email,
      phone: updateUserDto.phone ? updateUserDto.phone : user.data[0].phone,
      city: updateUserDto.city ? updateUserDto.city : user.data[0].city,
      state: updateUserDto.state ? updateUserDto.state : user.data[0].state,
      dateOfBirth: updateUserDto.dateOfBirth
        ? updateUserDto.dateOfBirth
        : user.data[0].dateOfBirth,
      updatedAt: new Date(),
    };

    await this.baseService.update(user.data[0].id, data, users);

    return {
      status: 200,
      message: 'User updated successfully',
    };
  }
}
