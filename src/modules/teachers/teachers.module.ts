import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [EventEmitterModule],
})
export class TeachersModule {}
