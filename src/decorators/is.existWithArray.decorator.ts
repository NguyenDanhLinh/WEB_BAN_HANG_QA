import { getModelFromTableName } from '@lib/db'
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { ModelCtor } from 'sequelize-typescript'

export function IsAlreadyExistWithArray(
  property: string,
  key: string,
  expectedKeys: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property, key],
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [tableName, tableField] = args.constraints

          if (!value) {
            return true
          }

          let check = true

          await Promise.all(
            value.map((item) => {
              for (const key of expectedKeys) {
                if (!item.hasOwnProperty(key) || Object.keys(item).length !== expectedKeys.length) {
                  check = false
                }
              }

              if (check) {
                const model: ModelCtor = getModelFromTableName(tableName)

                if (model !== undefined) {
                  const whereClause = {}

                  whereClause[tableField] = item.itemId

                  return model
                    .findOne({
                      where: whereClause,
                    })
                    .then((user) => {
                      if (!user) {
                        check = false
                      }
                    })
                } else {
                  check = false
                }
              }
            }),
          )

          return check
        },
        defaultMessage(): string {
          return `Field does not exist in ${property}!`
        },
      },
    })
  }
}
