import { Module } from '@nestjs/common';
import { EventBinder } from './EventsBinder.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [EventEmitterModule.forRoot({ global: true }), DiscoveryModule],
  providers: [EventBinder],
})
export class CoreModule {}
