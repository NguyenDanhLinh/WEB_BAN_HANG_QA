import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface ItemRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}
