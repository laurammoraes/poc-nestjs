import { Inject, Injectable } from '@nestjs/common';
import { users } from 'src/database/schemas/schema_ols';
import { and, eq, isNull } from 'drizzle-orm';
import { GetResponseDto } from './dto/get-response.dto';

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE_CONNECTION') private db) {}

  async validatePhoneOnDatabase(phone: string): Promise<boolean> {
    const validatePhone = await this.db
      .select({
        id: users.id,
      })
      .from(users)
      .where(and(eq(users.phone, phone), isNull(users.deletedAt)))
      .execute();

    if (validatePhone && validatePhone.length > 0) {
      return true;
    }

    return false;
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
