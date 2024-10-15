import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  role: varchar('role', { length: 256 }),
  companyId: integer('company_id').references(() => companies.id),
  createdAt: varchar('createdAt', { length: 256 }),
  updatedAt: varchar('updatedAt', { length: 256 }),
  deletedAt: varchar('deletedAt', { length: 256 }),
});

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  createdAt: varchar('createdAt', { length: 256 }),
  updatedAt: varchar('updatedAt', { length: 256 }),
  deletedAt: varchar('deletedAt', { length: 256 }),
});
