import { Inject, Injectable } from '@nestjs/common';
import { users } from 'src/database/schemas/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { BaseService } from 'src/base/base.service';
@Injectable()
export class UserService {
  constructor(@Inject('DATABASE_CONNECTION') private db) {}


  async validatePhoneOnDatabase(phone: string): Promise<boolean> {
    const validatePhone = await this.db
    .select({
      id: users.id,
    })
    .from(users)
    .where(
      and(eq(users.phone, phone), isNull(users.deletedAt)),
    ).execute();

    if (validatePhone.length > 0) {
      return true;
    }

    return false;
  }           
}
