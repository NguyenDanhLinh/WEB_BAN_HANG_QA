import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface FlashSaleItemRepositoryInterface<M extends Model>
  extends BaseRepositoryInterface {}
