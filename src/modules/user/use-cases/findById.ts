import { BaseService } from 'src/base/base.service';
import { GetResponseDto } from '../dto/get-response.dto';
import { ResponseDto } from 'src/modules/user/dto/response.dto';
import { users } from 'src/database/schemas/schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserById {
  constructor(private readonly baseService: BaseService) {}

  async execute(id: number): Promise<GetResponseDto | ResponseDto> {
    const res = await this.baseService.getById(id, users);

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
