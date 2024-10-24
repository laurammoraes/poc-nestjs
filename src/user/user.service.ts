import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseDto } from 'src/dto-global/response.dto';
import { users } from 'src/database/schemas/schema';
import { isNull } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_CONNECTION') private db, 
  ) {}


  async create(createUserDto: CreateUserDto): Promise<ResponseDto> {
    const validatePhone = await this.db.select().from(users).where(isNull(users.deletedAt))

    if(validatePhone){
      return {
        status: 409,
        message: 'Phone number exists in our database'
      }
    }

    await this.db.insert(users).values({
      createUserDto
    }).execute()

    return {
      status: 200,
      message: 'User created sucefully'
    };
  }

  findAll() {
    
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
