import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface CartRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}
