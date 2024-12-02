import { BaseService } from "src/base/base.service";
import { UserService } from "../user.service";
import { ResponseDto } from "src/dto/response.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { users } from "src/database/schemas/schema";
import { GetResponseDto } from "../dto/get-response.dto";
import { Inject } from "@nestjs/common";
import { and, eq, isNull } from "drizzle-orm";

export class UpdateUser {
    constructor(private readonly userService: UserService, private readonly baseService: BaseService, @Inject('DATABASE_CONNECTION') private db) {}

    async execute(phone: string, updateUserDto: UpdateUserDto): Promise<ResponseDto> {
        const validatePhone = await this.userService.validatePhoneOnDatabase(phone)

        if (!validatePhone) {
            return {
                status: 404,
                message: 'User not found',
            }
        }

        const user = await this.findByPhone(phone)

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
          }

        await this.baseService.update(phone, data, users)

        return {
            status: 200,
            message: 'User updated successfully',
        }
    }

    async findByPhone(phone: string): Promise<GetResponseDto> {
        const res = await this.db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            phone: users.phone,
            dateOfBirth: users.dateOfBirth,
            address: users.address,
            city: users.city,
            state: users.state,
          })
          .from(users)
          .where(and(eq(users.phone, phone), isNull(users.deletedAt)))
          .execute();
    
        
    
        return {
          status: 200,
          data: res,
        };
      }
}
