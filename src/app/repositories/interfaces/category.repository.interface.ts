import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface CategoryRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}
