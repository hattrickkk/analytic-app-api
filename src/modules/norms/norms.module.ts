import { Module } from '@nestjs/common';
import { NormsService } from './norms.service';
import { NormsController } from './norms.controller';

@Module({
  controllers: [NormsController],
  providers: [NormsService],
})
export class NormsModule {}
