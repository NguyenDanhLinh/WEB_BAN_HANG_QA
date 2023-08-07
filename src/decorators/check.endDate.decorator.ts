import { registerDecorator, ValidationOptions } from 'class-validator'

export function checkEndDate(validationOptions?: ValidationOptions) {
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

          const targetDate = new Date(value)
          const currentDate = new Date()

          return currentDate < targetDate
        },

        defaultMessage(): string {
          return 'Invalid endDate'
        },
      },
    })
  }
}
