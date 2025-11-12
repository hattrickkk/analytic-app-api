import { PrismaService } from '@/utils/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubjectsService {
  constructor(private prismaService: PrismaService) {}

  async getSubjects({
    teacherId,
    year,
  }: {
    teacherId?: number;
    year?: string;
  }) {
    const subjects = await this.prismaService.subject.findMany({
      include: {
        workloads: {
          where: { teacherId },
          include: { type: { select: { name: true } } },
        },
      },
    });

    return subjects.map((s) => {
      return {
        ...s,
        workloads: s.workloads
          .filter((w) => !year || w.year === year)
          .map((w) => {
            return {
              ...w,
              type: w.type.name,
            };
          }),
      };
    });
  }
}
