export interface CreateVoucherInterface {
  name: string
  percent: number
  moneyReduced: string
  startDate: Date
  endDate: Date
  inventoryNumber: number
  barcode?: string
}
