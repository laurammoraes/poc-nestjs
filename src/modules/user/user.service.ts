import { Injectable } from '@nestjs/common';
import { GetResponseDto } from './dto/get-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseDto } from './dto/response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetAllResponseDto } from './dto/get-all-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<ResponseDto> {
    const validatePhone = await this.validatePhoneOnDatabase(data.phone);

    if (validatePhone) {
      return {
        status: 409,
        message: 'Phone number exists in our database',
      };
    }

    await this.prisma.users.create({
      data,
    });

    return {
      status: 200,
      message: 'User created successfully',
    };
  }

  async update(
    phone: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseDto> {
    const validatePhone = await this.validatePhoneOnDatabase(phone);

    if (validatePhone) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    const user = await this.findByPhone(phone);

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

    await this.prisma.users.update({
      where: { id: user.data[0].id },
      data,
    });

    return {
      status: 200,
      message: 'User updated successfully',
    };
  }

  async delete(phone: string): Promise<any> {
    const user = await this.prisma.users.findFirst({
      where: { phone: phone },
    });

    if (!user) {
      return { status: 404, message: 'No user found' };
    }

    await this.prisma.users.update({
      where: { id: user.id },
      data: { deleted_at: new Date() },
    });

    return {
      status: 200,
      message: 'User deleted successfully',
    };
  }

  async findAll(limit, page): Promise<GetAllResponseDto | ResponseDto> {
    const offset = (page - 1) * limit;
    const res = await this.prisma.users.findMany({
      take: limit,
      skip: offset,
    });

    const totalCount = await this.prisma.users.count(); // Total de usuários para calcular páginas

    if (res.length === 0) {
      return { status: 404, message: 'No user found' };
    }

    const data = res.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      date_of_birth: user.date_of_birth,
      address: user.address,
      city: user.city,
      state: user.state,
    }));

    return {
      status: 200,
      data,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async findOne(id: number): Promise<GetResponseDto | ResponseDto> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return { status: 404, message: 'No user found' };
    }

    return {
      status: 200,
      data: user,
    };
  }

  async validatePhoneOnDatabase(phone: string): Promise<boolean> {
    const validatePhone = await this.prisma.users.findFirst({
      where: { phone, deleted_at: null },
    });

    if (validatePhone) {
      return true;
    }

    return false;
  }

  async findByPhone(phone: string): Promise<GetResponseDto> {
    const res = await this.prisma.users.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        date_of_birth: true,
        address: true,
        city: true,
        state: true,
      },
      where: { phone, deleted_at: null },
    });

    return {
      status: 200,
      data: res,
    };
  }
}
