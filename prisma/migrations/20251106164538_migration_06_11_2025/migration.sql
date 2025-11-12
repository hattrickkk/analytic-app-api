/*
  Warnings:

  - You are about to drop the column `roleId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[teacherId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "reference"."users" DROP CONSTRAINT "users_roleId_fkey";

-- AlterTable
ALTER TABLE "reference"."users" DROP COLUMN "roleId",
ADD COLUMN     "isAdmin" BOOLEAN,
ADD COLUMN     "teacherId" INTEGER;

-- DropTable
DROP TABLE "reference"."roles";

-- CreateTable
CREATE TABLE "reference"."positions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reference"."teachers" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "positionId" INTEGER NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "positions_name_key" ON "reference"."positions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_teacherId_key" ON "reference"."users"("teacherId");

-- AddForeignKey
ALTER TABLE "reference"."users" ADD CONSTRAINT "users_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "reference"."teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reference"."teachers" ADD CONSTRAINT "teachers_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "reference"."positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
