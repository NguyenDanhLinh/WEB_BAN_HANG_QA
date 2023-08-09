import { getModelFromTableName } from '@lib/db'
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { ModelCtor } from 'sequelize-typescript'
import { HttpException } from '@exceptions/http.exception'

export function IsNotExist(property: string, key: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property, key],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [tableName, tableField] = args.constraints
          if (!value) {
            return true
          }
          const model: ModelCtor = getModelFromTableName(tableName)
          if (model !== undefined) {
            const whereClause = {}
            whereClause[tableField] = value
            return model
              .findOne({
                where: whereClause,
              })
              .then((user) => {
                if (user) return false
                return true
              })
          } else {
            throw new HttpException(400, 'server error')
          }
        },
        defaultMessage(): string {
          return `Field already exist in ${property}!`
        },
      },
    })
  }
}
