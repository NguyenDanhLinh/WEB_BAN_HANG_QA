import { HttpException } from '@exceptions/http.exception'
import { CreateVoucherInterface, UpdateVoucherInterface } from '@interfaces/voucher.interface'
import VoucherServices from '@services/voucher.service'
import { Container } from 'typedi'
import CartServices from '@services/cart.service'
import { Pagination } from '@interfaces/pagination.interface'
import CategoryServices from '@services/category.service'

const categoryServices = Container.get(CategoryServices)

describe('category.service.ts', () => {
  describe('#createCategory()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            name: 'the thao',
            img: 'https://ipfs.filebase.io/ipfs/QmNoZ6hT1fdCm8A9B4uzzT8CdqVucT7B5L23vtxP7giJLX',
          },
          expected: {
            id: 1,
            img: 'https://ipfs.filebase.io/ipfs/QmNoZ6hT1fdCm8A9B4uzzT8CdqVucT7B5L23vtxP7giJLX',
            name: 'the thao',
            status: 'active',
          },
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const actualReturn = await categoryServices.createCategory(params)

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })

  describe('#getListCategories()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            pagination: { skip: 0, limit: 10, sort: [], search: [] } as Pagination,
          },
          expected: {
            count: 1,
            rows: [
              {
                id: 1,
                img: 'https://ipfs.filebase.io/ipfs/QmNoZ6hT1fdCm8A9B4uzzT8CdqVucT7B5L23vtxP7giJLX',
                name: 'the thao',
                status: 'active',
              },
            ],
          },
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const actualReturn = await categoryServices.getListCategories(params.pagination)

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })

  describe('#updateCategory()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            id: 1,
            name: 'the thao 1',
            img: 'https://ipfs.filebase.io/ipfs/QmNoZ6hT1fdCm8A9B4uzzT8CdqVucT7B5L23vtxP7giJLX',
          },
          expected: [1],
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const actualReturn = await categoryServices.updateCategory(params)

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })

  describe('#deleteCategory()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            id: 1,
          },
          expected: 1,
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const actualReturn = await categoryServices.deleteCategory(params.id)

        expect(actualReturn).toBe(expected)
      })
    })
  })
})
