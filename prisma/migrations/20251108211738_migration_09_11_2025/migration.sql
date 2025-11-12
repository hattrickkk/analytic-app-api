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
CREATE UNIQUE INDEX "work_norms_typeId_year_rate_positionId_key" ON "reference"."work_norms"("typeId", "year", "rate", "positionId");

-- AddForeignKey
ALTER TABLE "reference"."work_norms" ADD CONSTRAINT "work_norms_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "reference"."workload_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reference"."work_norms" ADD CONSTRAINT "work_norms_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "reference"."positions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workload_plans" ADD CONSTRAINT "workload_plans_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "reference"."teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
