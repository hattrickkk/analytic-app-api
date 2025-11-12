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

-- CreateIndex
CREATE UNIQUE INDEX "workload_types_name_key" ON "reference"."workload_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "reference"."subjects"("name");

-- AddForeignKey
ALTER TABLE "public"."workloads" ADD CONSTRAINT "workloads_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "reference"."teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workloads" ADD CONSTRAINT "workloads_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "reference"."workload_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workloads" ADD CONSTRAINT "workloads_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "reference"."subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
