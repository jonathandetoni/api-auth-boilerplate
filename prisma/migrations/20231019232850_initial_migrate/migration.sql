-- CreateEnum
CREATE TYPE "TypeUsers" AS ENUM ('USER', 'ADMIN', 'COMMON', 'PROFESSIONAL', 'ADMINISTRATOR');

-- CreateEnum
CREATE TYPE "ContactsTypes" AS ENUM ('PHONE_NUMBER', 'CELPHONE_NUMBER', 'EMAIL', 'APP_WHATSAPP', 'MIDIASOCIAL_FACEBOOK', 'MIDIASOCIAL_INTAGRAM', 'OTHER');

-- CreateTable
CREATE TABLE "tenants" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "typeUser" "TypeUsers" NOT NULL DEFAULT 'COMMON',
    "tenantId" UUID NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data-basic-users" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255),
    "birthdate" DATE,
    "userId" UUID NOT NULL,

    CONSTRAINT "data-basic-users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adresses" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dataBasicUsersId" UUID NOT NULL,

    CONSTRAINT "adresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactType" "ContactsTypes" NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "dataBasicUsersId" UUID NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_id_key" ON "tenants"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_name_key" ON "tenants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "data-basic-users_id_key" ON "data-basic-users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "data-basic-users_userId_key" ON "data-basic-users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "adresses_id_key" ON "adresses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_id_key" ON "contacts"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data-basic-users" ADD CONSTRAINT "data-basic-users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_dataBasicUsersId_fkey" FOREIGN KEY ("dataBasicUsersId") REFERENCES "data-basic-users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_dataBasicUsersId_fkey" FOREIGN KEY ("dataBasicUsersId") REFERENCES "data-basic-users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
