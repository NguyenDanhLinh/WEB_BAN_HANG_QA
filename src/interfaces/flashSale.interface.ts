export interface CreateFlashSaleInterface {
  startDate: Date
  endDate: Date
  items: Array<{ itemId: any; quantity: any; percent: any; moneyReduced: any }>
}

export interface GetFlashSaleInterface {
  id: number
}
