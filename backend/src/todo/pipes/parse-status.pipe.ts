import {
   ArgumentMetadata,
   BadRequestException,
   Injectable,
   PipeTransform,
} from '@nestjs/common';
import { TodoStatus } from '@/types/todo';

@Injectable()
export class ParseStatusPipe implements PipeTransform {
   transform(value: any, _metadata: ArgumentMetadata): TodoStatus {
      if (!value) {
         throw new BadRequestException('Status query parameter is required');
      }

      const status = String(value).trim().toLowerCase();

      const validStatuses = Object.values(TodoStatus) as string[];

      if (!validStatuses.includes(status)) {
         throw new BadRequestException(
            `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
         );
      }

      return status as TodoStatus;
   }
}
