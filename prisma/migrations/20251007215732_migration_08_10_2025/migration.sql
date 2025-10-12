-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "reference";

-- CreateTable
CREATE TABLE "reference"."users" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reference"."roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "reference"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "reference"."roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_key" ON "reference"."roles"("code");

-- AddForeignKey
ALTER TABLE "reference"."users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "reference"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
