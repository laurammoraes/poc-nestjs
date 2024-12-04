import { BaseService } from 'src/base/base.service';
import { users } from 'src/database/schemas/schema';
import { ResponseDto } from 'src/modules/user/dto/response.dto';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class RemoveUser {
  constructor(
    private readonly baseService: BaseService,
    private readonly userService: UserService,
  ) {}

  async execute(phone: string): Promise<ResponseDto> {
    const user = await this.userService.findByPhone(phone);

    if (!user.data[0].id) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    await this.baseService.delete(user.data[0].id, users);

    return {
      status: 200,
      message: 'User deleted succesully',
    };
  }
}
