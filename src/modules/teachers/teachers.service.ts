import { OnEmit } from '@/decorators/onEmit';
import { PrismaService } from '@/utils/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prismaService: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  @OnEmit('teachers.get')
  log(payload: any) {
    console.log('teachers.get', payload);
  }

  async getAll() {
    const teachers = await this.prismaService.teacher.findMany({
      select: { id: true, firstName: true, lastName: true, patronymic: true },
    });

    this.eventEmitter.emit('teachers.get', teachers);
    return teachers;
  }
}
