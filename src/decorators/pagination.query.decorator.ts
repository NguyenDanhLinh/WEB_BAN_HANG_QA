import { Action, ParamOptions, getMetadataArgsStorage } from 'routing-controllers'

export function PaginationQueryParams(options?: ParamOptions): Function {
  return function (object: Object, methodName: string, index: number) {
    getMetadataArgsStorage().params.push({
      type: 'queries',
      object: object,
      method: methodName,
      index: index,
      name: '',
      parse: options ? options.parse : false,
      required: options ? options.required : undefined,
      classTransform: options ? options.transform : undefined,
      explicitType: options ? options.type : undefined,
      validate: options ? options.validate : undefined,
      transform: (action: Action) => {
        const query = action.request.query
        delete query['skip']
        delete query['limit']
        delete query['sort']
        delete query['search']
        return query
      },
    })
  }
}
