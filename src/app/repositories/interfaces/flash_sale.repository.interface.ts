import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface FlashSaleRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}
