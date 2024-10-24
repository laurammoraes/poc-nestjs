import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseDto } from 'src/dto-global/response.dto';
import { users } from 'src/database/schemas/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { GetAllResponseDto } from './dto/get-all-response.dto';
import { GetResponseDto } from './dto/get-response.dto';

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE_CONNECTION') private db) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseDto> {
    const validatePhone = await this.db
      .select()
      .from(users)
      .where(isNull(users.deletedAt));

    if (validatePhone) {
      return {
        status: 409,
        message: 'Phone number exists in our database',
      };
    }

    await this.db
      .insert(users)
      .values({
        createUserDto,
      })
      .execute();

    return {
      status: 200,
      message: 'User created sucefully',
    };
  }

  async findAll(): Promise<GetAllResponseDto | ResponseDto> {
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
      .where(isNull(users.deletedAt))
      .execute();

    if (!res) {
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

  async findById(id: number): Promise<GetResponseDto | ResponseDto> {
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
      .where(and(eq(users.id, id), isNull(users.deletedAt)))
      .execute();

    if (!res) {
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

  async findByPhone(phone: string): Promise<GetResponseDto | ResponseDto> {
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

    if (!res) {
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

  async update(
    phone: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseDto> {
    await this.db
      .update(users)
      .set({
        updateUserDto,
      })
      .where(and(eq(users.phone, phone), isNull(users.deletedAt)))
      .execute();

    return {
      status: 200,
      message: 'User updated successfully',
    };
  }

  async removeByPhone(phone: string): Promise<ResponseDto> {
    await this.db
      .delete()
      .from(users)
      .where(and(eq(users.phone, phone), isNull(users.deletedAt)))
      .execute();

    return {
      status: 200,
      message: 'User deleted successfully',
    };
  }
}
