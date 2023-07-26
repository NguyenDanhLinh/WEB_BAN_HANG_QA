export interface Pagination {
  skip?: number
  limit?: number
  sort?: [key: string, by: 'ASC' | 'DESC'][]
  search?: { field: string; value: string }[]
}
