import { EVENT_KEY } from '@/decorators/onEmit';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventBinder implements OnApplicationBootstrap {
  constructor(
    private discoveryService: DiscoveryService,
    private reflector: Reflector,
    private eventEmitter: EventEmitter2,
  ) {}

  onApplicationBootstrap() {
    const providers = this.discoveryService.getProviders();
    providers.forEach((wrapper) => {
      const { instance } = wrapper;
      if (!instance) return;

      const methods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(instance),
      );

      methods.forEach((name) => {
        const method = instance[name];
        if (typeof method !== 'function') return;

        const event = this.reflector.get(EVENT_KEY, method);

        if (event) {
          this.eventEmitter.on(event, (payload) => {
            method.call(instance, payload);
            console.log({ payload });
          });
        }
      });
    });
  }
}
