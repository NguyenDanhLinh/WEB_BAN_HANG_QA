export interface CreateVoucherInterface {
  name: string
  percent: number
  moneyReduced: string
  startDate: Date
  endDate: Date
  inventoryNumber: number
  barcode?: string
}

export interface UpdateVoucherInterface {
  voucherId: number
  name: string
  percent: number
  startDate: Date
  endDate: Date
  moneyReduced: string
  inventoryNumber: number
}
