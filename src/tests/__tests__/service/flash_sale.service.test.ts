import { HttpException } from '@exceptions/http.exception'
import { CreateVoucherInterface, UpdateVoucherInterface } from '@interfaces/voucher.interface'
import VoucherServices from '@services/voucher.service'
import { Container } from 'typedi'
import CartServices from '@services/cart.service'
import { Pagination } from '@interfaces/pagination.interface'
import FlashSaleServices from '@services/flash_sale.service'

const flashSaleServices = Container.get(FlashSaleServices)

describe('flash_sale.service.ts', () => {
  describe('#getFlashSale()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            pagination: { skip: 0, limit: 10, sort: [], search: [] } as Pagination,
            id: { id: 1 },
          },
          expected: { count: 0, rows: [] },
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const actualReturn = await flashSaleServices.getFlashSale(params.pagination, params.id)

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })
})
