import {
  integer,
  pgTable,
  serial,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  phone: varchar('phone', { length: 25 }),
  dateOfBirth: varchar('date_of_birth', { length: 25 }),
  address: varchar('address', { length: 256 }),
  city: varchar('city', { length: 256 }),
  state: varchar('state', { length: 256 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
