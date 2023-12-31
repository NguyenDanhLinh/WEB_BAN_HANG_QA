import { Service } from 'typedi'
import { ModelCtor, Model } from 'sequelize-typescript'
import { BaseRepositoryInterface } from './interfaces/base.repository.interface'
import { Transaction } from 'sequelize'

@Service()
export abstract class BaseRepository<M extends Model> implements BaseRepositoryInterface {
  protected model: ModelCtor<M>

  constructor(model: ModelCtor<M>) {
    this.model = model
  }

  async findById(id: number): Promise<M> {
    return this.model.findByPk(id)
  }

  async getAll(params?: any): Promise<M[]> {
    return this.model.findAll(params)
  }

  async findByCondition(object: Object): Promise<M> {
    return this.model.findOne(object)
  }

  async deleteByCondition(whereClause: any, transaction?: Transaction): Promise<number> {
    return this.model.destroy({ where: whereClause, transaction })
  }

  async getByCondition(whereClause: any, offset: number, limit: number, orderBy: any) {
    return this.model.findAndCountAll({
      where: whereClause,
      order: orderBy,
      offset,
      limit,
    })
  }

  async create(object: any): Promise<M> {
    return this.model.create(object)
  }

  async createWithAssociation(object: any, association: any) {
    return this.model.create(object, association)
  }

  async deleteById(id: any, transaction?: Transaction): Promise<number> {
    return this.model.destroy({ where: { id: id }, transaction })
  }

  async update(
    object: Object,
    condition: import('sequelize').UpdateOptions,
  ): Promise<[affectedCount: number]> {
    return this.model.update(object, condition)
  }

  /**
   * create equal predicate for where clause.
   * @private
   * @param {{
   *   key: string,
   *   value: primitive | Array<primitive | Date> | Date,
   *   allowNull: boolean,
   * }}
   * @returns {{
   *   key: primitive | Array<primitive | Date> | Date
   * }}
   */
  _createEqualWhereClause({ key, value, allowNull = false }): object {
    if (!allowNull && this._isNullish(value)) {
      return {}
    }

    return {
      [key]: value,
    }
  }

  /**
     * is nullish
     * @private
     @param {} value
     * @returns {boolean} true: nullish
     */
  _isNullish(value): boolean {
    return value === undefined || value === null
  }
}
