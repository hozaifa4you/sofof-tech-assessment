import {
   registerDecorator,
   ValidationOptions,
   ValidationArguments,
} from 'class-validator';

export function IsImageFile(validationOptions?: ValidationOptions) {
   return function (object: object, propertyName: string) {
      registerDecorator({
         name: 'isImageFile',
         target: object.constructor,
         propertyName: propertyName,
         options: validationOptions,
         validator: {
            validate(value: any, _args: ValidationArguments) {
               if (!value) return true;

               // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
               if (!value.mimetype || !value.size || !value.originalname) {
                  return false;
               }

               const allowedMimeTypes = [
                  'image/jpeg',
                  'image/png',
                  'image/gif',
                  'image/webp',
               ];
               // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
               if (!allowedMimeTypes.includes(value.mimetype)) {
                  return false;
               }

               const maxSize = 1 * 1024 * 1024;
               // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
               if (value.size > maxSize) {
                  return false;
               }

               return true;
            },
            defaultMessage(_args: ValidationArguments) {
               return 'Image must be a valid image file (JPEG, PNG, GIF, WebP) and less than 1MB';
            },
         },
      });
   };
}

export function MaxFileSize(
   maxSizeInBytes: number,
   validationOptions?: ValidationOptions,
) {
   return function (object: object, propertyName: string) {
      registerDecorator({
         name: 'maxFileSize',
         target: object.constructor,
         propertyName: propertyName,
         constraints: [maxSizeInBytes],
         options: validationOptions,
         validator: {
            validate(value: any, args: ValidationArguments) {
               if (!value) return true;
               // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
               const [maxSize] = args.constraints;
               // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
               return value.size <= maxSize;
            },
            defaultMessage(args: ValidationArguments) {
               // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
               const [maxSize] = args.constraints;
               return `File size must not exceed ${Math.round(maxSize / (1024 * 1024))}MB`;
            },
         },
      });
   };
}
