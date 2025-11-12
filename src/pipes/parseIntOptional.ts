import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntOptionalPipe implements PipeTransform {
  transform(value: string | undefined, metadata: ArgumentMetadata) {
    if (!value) return undefined;

    const parsed = parseInt(value);

    if (!isNaN(parsed)) {
      return parsed;
    }
    throw new BadRequestException('Передан неверный параметр для типа Int');
  }
}
