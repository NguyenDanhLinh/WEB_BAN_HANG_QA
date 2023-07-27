import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface VoucherRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}
