-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "reference";

-- CreateTable
CREATE TABLE "reference"."users" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN,
    "teacherId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "reference"."workload_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "workload_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workloads" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "workloads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reference"."subjects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reference"."work_norms" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "positionId" INTEGER,

    CONSTRAINT "work_norms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workload_plans" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "plannedHours" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "workload_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "reference"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "reference"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_teacherId_key" ON "reference"."users"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "positions_name_key" ON "reference"."positions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "workload_types_name_key" ON "reference"."workload_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "reference"."subjects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "work_norms_typeId_year_rate_positionId_key" ON "reference"."work_norms"("typeId", "year", "rate", "positionId");

-- AddForeignKey
ALTER TABLE "reference"."users" ADD CONSTRAINT "users_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "reference"."teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reference"."teachers" ADD CONSTRAINT "teachers_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "reference"."positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workloads" ADD CONSTRAINT "workloads_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "reference"."teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workloads" ADD CONSTRAINT "workloads_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "reference"."workload_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workloads" ADD CONSTRAINT "workloads_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "reference"."subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reference"."work_norms" ADD CONSTRAINT "work_norms_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "reference"."workload_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reference"."work_norms" ADD CONSTRAINT "work_norms_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "reference"."positions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workload_plans" ADD CONSTRAINT "workload_plans_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "reference"."teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
