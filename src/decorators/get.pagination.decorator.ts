import { createParamDecorator, Action } from 'routing-controllers'
import { Pagination } from '@interfaces/pagination.interface'
import { Op } from 'sequelize'

export function GetPagination(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: (action: Action) => {
      const paginationParams: Pagination = {
        skip: 0,
        limit: 10,
        sort: [],
        search: [],
      }
      const query = action.request.query
      paginationParams.skip = query.skip ? parseInt(query.skip.toString()) : 0
      paginationParams.limit = query.limit ? parseInt(query.limit.toString()) : 10

      // create array of sort
      if (query.sort) {
        const sortArray = query.sort.toString().split(',')
        paginationParams.sort = sortArray.map((sortItem) => {
          sortItem = sortItem.trim()
          const sortBy = sortItem[0]
          switch (sortBy) {
            case '-':
              return [sortItem.slice(1), 'ASC']
            case '+':
              return [sortItem.slice(1), 'ASC']
            default:
              return [sortItem.trim(), 'DESC']
          }
        })
      }

      // create array of search
      if (query.search) {
        const searchArray = query.search.toString().split(',')
        searchArray.map((searchItem) => {
          const field = searchItem.split(':')[0]
          const value = searchItem.split(':')[1]
          const objectLike: any = { [Op.substring]: value.trim() }

          paginationParams.search[field.trim()] = objectLike
        })
      }

      return paginationParams
    },
  })
}
