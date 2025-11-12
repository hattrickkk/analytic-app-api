import 'reflect-metadata';

export const EVENT_KEY = 'TEACHER_EVENT';

// декоратор для подписки на события
export const OnEmit = (eventName: string) => {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // сохраненние метаданных на самой функции через  descriptor.value
    Reflect.defineMetadata(EVENT_KEY, eventName, descriptor.value);
  };
};
