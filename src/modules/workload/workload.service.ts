import { PrismaService } from '@/utils/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkloadService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAvailableYears(teacherId?: number) {
    const workloads = await this.prismaService.workLoad.findMany({
      where: {
        teacherId,
      },
      select: { year: true },
    });

    const uniqueYears = new Set(workloads.map(({ year }) => year as string));

    return Array.from(uniqueYears);
  }
}
