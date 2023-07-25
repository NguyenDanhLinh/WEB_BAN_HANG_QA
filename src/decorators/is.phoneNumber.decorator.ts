import { registerDecorator, ValidationOptions } from 'class-validator'

export function isValidPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          if (!value) {
            return false
          }

          const phoneRegex = /^(?:\+84|0)\d{9}$/

          return phoneRegex.test(value)
        },

        defaultMessage(): string {
          return 'Invalid phone number'
        },
      },
    })
  }
}
