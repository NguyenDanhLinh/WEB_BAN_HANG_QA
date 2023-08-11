export interface AddItemToCart {
  itemId: number
  quantity: number
}

export interface DeleteItemToCart {
  itemId: number
}

export interface IncrementItemToCart extends DeleteItemToCart {
  quantity?: number
}
