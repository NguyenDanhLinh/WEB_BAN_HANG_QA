import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface CartItemRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}
