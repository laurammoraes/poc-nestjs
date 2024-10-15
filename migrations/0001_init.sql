CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"createdAt" varchar(256),
	"updatedAt" varchar(256),
	"deletedAt" varchar(256)
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "telephone" TO "role";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "company_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "createdAt" varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updatedAt" varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "deletedAt" varchar(256);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
