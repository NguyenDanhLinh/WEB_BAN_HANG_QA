export interface CreateOrderInterface {
  voucherId?: number
  items: Array<{ itemId: any; quantity: any; flashSaleId?: number }>
}

export interface GetOrderInterface {
  id: number
}
