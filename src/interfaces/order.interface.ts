export interface CreateOrderInterface {
  voucherId?: number
  items: Array<{ itemId: any; quantity: any; flashSaleId?: number }>
}
