import {
   ArgumentMetadata,
   BadRequestException,
   Injectable,
   PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseTodoDate implements PipeTransform {
   transform(value: string, _metadata: ArgumentMetadata): Date | undefined {
      if (!value || value === '' || value === 'undefined') {
         return undefined;
      }

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(value)) {
         throw new BadRequestException('Date must be in YYYY-MM-DD format');
      }

      const date = new Date(value);
      if (isNaN(date.getTime())) {
         throw new BadRequestException('Invalid date provided');
      }

      return date;
   }
}
