-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256),
    "createdAt" VARCHAR(256),
    "updatedAt" VARCHAR(256),
    "deletedAt" VARCHAR(256),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256),
    "email" VARCHAR(256),
    "phone" VARCHAR(25),
    "date_of_birth" VARCHAR(25),
    "address" VARCHAR(256),
    "city" VARCHAR(256),
    "state" VARCHAR(256),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
