import { BaseService } from "src/base/base.service";
import { users } from "src/database/schemas/schema";
import { ResponseDto } from "src/dto/response.dto";

export class RemoveUser {
    constructor( private readonly baseService: BaseService) {}

    async execute(phone: string): Promise<ResponseDto> {
        await this.baseService.delete(phone, users)

        return {
            status: 200,
            message: 'User deleted successfully',
        }
    }
}

