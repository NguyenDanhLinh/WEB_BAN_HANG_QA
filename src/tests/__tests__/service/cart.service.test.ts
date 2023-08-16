import { HttpException } from '@exceptions/http.exception'
import { CreateVoucherInterface, UpdateVoucherInterface } from '@interfaces/voucher.interface'
import VoucherServices from '@services/voucher.service'
import { Container } from 'typedi'
import CartServices from '@services/cart.service'
import { Pagination } from '@interfaces/pagination.interface'

const cartServices = Container.get(CartServices)

describe('cart.service.ts', () => {
  describe('#getListItemInCart()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            pagination: { skip: 0, limit: 10, sort: [], search: [] } as Pagination,
            userId: 1,
          },
          expected: { count: 0, rows: [] },
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const actualReturn = await cartServices.getListItemInCart(params.pagination, params.userId)

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })
})
