import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface OrderRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}
