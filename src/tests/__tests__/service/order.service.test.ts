import { HttpException } from '@exceptions/http.exception'
import { CreateVoucherInterface, UpdateVoucherInterface } from '@interfaces/voucher.interface'
import VoucherServices from '@services/voucher.service'
import { Container } from 'typedi'
import CartServices from '@services/cart.service'
import { Pagination } from '@interfaces/pagination.interface'
import OrderServices from '@services/order.service'

const orderServices = Container.get(OrderServices)

describe('orders.service.ts', () => {
  describe('#getOrder()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            pagination: { skip: 0, limit: 10, sort: [], search: [] } as Pagination,
            userId: { id: 1 },
          },
          expected: { count: 0, rows: [] },
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const actualReturn = await orderServices.getOrder(params.pagination, params.userId)

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })

  describe('#checkTimeVoucher()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            voucherTime: new Date('2023-08-15T02:30:00Z'),
          },
          expected: true,
        },
      ]

      test.each(table)('params: $params', ({ params, expected }) => {
        const actualReturn = orderServices.checkTimeVoucher(params.voucherTime)

        expect(actualReturn).toBe(expected)
      })
    })
  })
})
