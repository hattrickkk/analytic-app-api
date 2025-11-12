import { PrismaService } from '@/utils/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class NormsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const norms = await this.prismaService.workNorm.findMany({
      omit: { positionId: true, typeId: true },
      include: {
        position: true,
        type: true,
      },
    });
    return norms.map((el) => {
      return { ...el, position: el.position?.name, type: el.type?.name };
    });
  }
}
