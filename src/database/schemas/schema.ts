

import {  integer, pgTable, serial,  varchar, timestamp } from 'drizzle-orm/pg-core';



export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256}), 
  phone: varchar('phone', { length: 25}),
  date_of_birth: varchar('date_of_birth', {length:25}),
  address: varchar('address', {length:256}),
  city: varchar('city', { length: 256}),
  state: varchar('state', {length: 256})
});


export const prescriptions = pgTable('prescriptions', {
  id: serial('id').primaryKey(),
  user_id: varchar('user_id', {length: 25}),
  type: varchar('type', { length: 256}),
  medication_id: varchar('medication_id', {length: 256}),
  dosage_frequency: integer('dosage_frequency'),
  total_quantity: integer('total_quantity'),
  alert_repurchase: integer('alert_repurchase'),
  date_init: timestamp('date_init',{withTimezone: true,}),
  date_end: timestamp('date_end',{withTimezone: true,}),


})

export const medications = pgTable('medications', {
  id: serial('id').primaryKey(),
  name: varchar('name', {length: 256}),
  dosage: varchar('dosage', {length: 256}),
  brand_name: varchar('brand_name', {length: 256}),
  type: varchar('type', {length: 256}),
  total_quantity: varchar('total_quantity', {length: 256}),
  form_of_use: varchar('form_of_use', {length: 256})
})


export const treatment_trackings= pgTable('treatment_trackings', {
  id: serial('id').primaryKey(),
  prescription_id: varchar('prescription_id', {length: 256}),
  date_tracking: varchar('date_tracking', {length: 256}),
  status: varchar('status', {length: 256}),
  brand_name: varchar('brand_name', {length: 256}),
  type: varchar('type', {length: 256}),
  total_quantity: varchar('total_quantity', {length: 256}),
  form_of_use: varchar('form_of_use', {length: 256})
})

