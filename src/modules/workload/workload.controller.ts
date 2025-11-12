import { Controller, Get, Query } from '@nestjs/common';
import { WorkloadService } from './workload.service';
import { ParseIntOptionalPipe } from '@/pipes/parseIntOptional';

@Controller('workloads')
export class WorkloadController {
  constructor(private readonly workloadService: WorkloadService) {}

  @Get('/years-count')
  getYearsCount(@Query('teacherId', ParseIntOptionalPipe) teacherId?: number) {
    return this.workloadService.getAvailableYears(teacherId);
  }
}
