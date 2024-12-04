import { BaseService } from 'src/base/base.service';
import { GetAllResponseDto } from '../dto/get-all-response.dto';
import { ResponseDto } from 'src/modules/user/dto/response.dto';
import { users } from 'src/database/schemas/schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUsers {
  constructor(private readonly baseService: BaseService) {}

  async execute(): Promise<GetAllResponseDto | ResponseDto> {
    const res = await this.baseService.getAll(users);

    if (res.length === 0) {
      return {
        status: 404,
        message: 'No user found',
      };
    }

    return {
      status: 200,
      data: res,
    };
  }
}
