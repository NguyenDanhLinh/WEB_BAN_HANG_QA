export interface CreateItemInterface {
  name: string
  inputPrice: string
  outputPrice: string
  weight: string
  description?: string
  inventoryNumber: number
  categoryId: number
  barcode?: string
  avatar: string
  imgDetail: string
}

export interface UpdateItemInterface {
  id: number
  name?: string
  outputPrice?: string
  description?: string
  inventoryNumber?: number
  avatar?: string
  imgDetail?: string
}
