-- CreateEnum
CREATE TYPE "StatusDemands" AS ENUM ('NEW', 'OPEN_BUDGETS', 'RECEIVED_BUDGETS', 'CHOSEN_BUDGETS', 'FINISHED');

-- CreateEnum
CREATE TYPE "StatusBudgets" AS ENUM ('SENT', 'OPEN', 'REFUSED', 'ACCEPTED');

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

-- CreateTable
CREATE TABLE "budgets-sent" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" "StatusBudgets" NOT NULL DEFAULT 'OPEN',
    "value" VARCHAR(255) NOT NULL,
    "professionalId" UUID NOT NULL,

    CONSTRAINT "budgets-sent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" "StatusDemands" NOT NULL DEFAULT 'NEW',
    "category" VARCHAR(255) NOT NULL,
    "typeService" VARCHAR(255) NOT NULL,
    "addressId" UUID NOT NULL,
    "ownerId" UUID NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "parentCommentId" UUID,
    "demandId" UUID NOT NULL,
    "ownerCommentId" UUID NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "budgets-sent_id_key" ON "budgets-sent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "budgets_id_key" ON "budgets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "budgets_name_key" ON "budgets"("name");

-- CreateIndex
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "comments_parentCommentId_key" ON "comments"("parentCommentId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data-basic-users" ADD CONSTRAINT "data-basic-users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_dataBasicUsersId_fkey" FOREIGN KEY ("dataBasicUsersId") REFERENCES "data-basic-users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_dataBasicUsersId_fkey" FOREIGN KEY ("dataBasicUsersId") REFERENCES "data-basic-users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets-sent" ADD CONSTRAINT "budgets-sent_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_ownerCommentId_fkey" FOREIGN KEY ("ownerCommentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
