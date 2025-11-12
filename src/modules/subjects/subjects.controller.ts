import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ParseIntOptionalPipe } from '@/pipes/parseIntOptional';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  findAll(
    @Query('teacherId', ParseIntOptionalPipe)
    teacherId: number | undefined,
    @Query('year', new DefaultValuePipe(undefined))
    year: string | undefined,
  ) {
    return this.subjectsService.getSubjects({ teacherId, year });
  }
}
