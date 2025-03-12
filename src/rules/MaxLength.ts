import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Custom decorator để kiểm tra chiều dài tối đa của chuỗi
 * @param maxLength - chiều dài tối đa của chuỗi
 * @param validationOptions - các options xác thực bổ sung
 */
export function MaxLength(maxLength: number, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'MaxLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [maxLength],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          return value.length <= maxLength;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should not exceed ${args.constraints[0]} characters, but current length is ${args.object[args.property]?.length || 0}`;
        },
      },
    });
  };
}
