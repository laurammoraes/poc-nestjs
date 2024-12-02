import { BaseService } from "src/base/base.service";
import { GetAllResponseDto } from "../dto/get-all-response.dto";
import { ResponseDto } from "src/dto/response.dto";
import { users } from "src/database/schemas/schema";

export class FindAllUsers {
    constructor(private readonly baseService: BaseService) {}

    async execute(): Promise<GetAllResponseDto | ResponseDto> {
        const res = await this.baseService.getAll(users)

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
