import { registerDecorator, ValidationOptions } from 'class-validator'

export function isValidEmail(validationOptions?: ValidationOptions) {
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

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

          return emailRegex.test(value)
        },

        defaultMessage(): string {
          return 'Invalid email address'
        },
      },
    })
  }
}
