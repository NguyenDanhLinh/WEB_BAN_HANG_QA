import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface OrderItemRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}
