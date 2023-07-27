import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface UserVoucherRepositoryInterface<M extends Model> extends BaseRepositoryInterface {}
