import {  integer, pgTable, serial,  varchar, timestamp } from 'drizzle-orm/pg-core';



export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256}), 
  phone: varchar('phone', { length: 25}).unique().notNull(),
  dateOfBirth: varchar('date_of_birth', {length:25}),
  address: varchar('address', {length:256}),
  city: varchar('city', { length: 256}),
  state: varchar('state', {length: 256}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});


export const prescriptions = pgTable('prescriptions', {
  id: serial('id').primaryKey().notNull(),
  userId: integer('user_id').notNull().references(() => users.id),
  type: varchar('type', { length: 256}),
  medicationId: integer('medication_id').notNull().references(() => medications.id),
  dosageFrequency: integer('dosage_frequency'),
  totalQuantity: integer('total_quantity'),
  alertRepurchase: integer('alert_repurchase'),
  dateInit: timestamp('date_init',{withTimezone: true,}),
  dateEnd: timestamp('date_end',{withTimezone: true,}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),

})

export const medications = pgTable('medications', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', {length: 256}),
  dosage: varchar('dosage', {length: 256}),
  brandName: varchar('brand_name', {length: 256}),
  type: varchar('type', {length: 256}),
  totalQuantity: varchar('total_quantity', {length: 256}),
  formOfUse: varchar('form_of_use', {length: 256}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
})


export const treatment_trackings= pgTable('treatment_trackings', {
  id: serial('id').primaryKey().notNull(),
  prescriptionId: integer('prescription_id').notNull().references(() => prescriptions.id),
  dateTracking: varchar('date_tracking', {length: 256}),
  status: varchar('status', {length: 256}),
  brandName: varchar('brand_name', {length: 256}),
  type: varchar('type', {length: 256}),
  totalQuantity: varchar('total_quantity', {length: 256}),
  formOfUse: varchar('form_of_use', {length: 256}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
})

