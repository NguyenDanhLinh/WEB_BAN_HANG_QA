import { HttpException } from '@exceptions/http.exception'
import { CreateVoucherInterface, UpdateVoucherInterface } from '@interfaces/voucher.interface'
import VoucherServices from '@services/voucher.service'
import { Container } from 'typedi'
import CartServices from '@services/cart.service'
import { Pagination } from '@interfaces/pagination.interface'
import CategoryServices from '@services/category.service'
import ItemServices from '@services/item.service'
import FlashSaleItemRepository from '@repositories/flashSale_item.repository'
import CartItemRepository from '@repositories/cart_item.repository'

const flashSaleItemRepository = Container.get(FlashSaleItemRepository)
const cartItemRepository = Container.get(CartItemRepository)
const itemServices = Container.get(ItemServices)

describe('items.service.ts', () => {
  describe('#createItem()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            name: 'quan ao adidas',
            inputPrice: '100',
            outputPrice: '150',
            weight: '1',
            description: 'mô tả ở đây',
            inventoryNumber: 100,
            categoryId: 1,
            avatar: 'https://ipfs.filebase.io/ipfs/QmNoZ6hT1fdCm8A9B4uzzT8CdqVucT7B5L23vtxP7giJLX',
            imgDetail:
              'https://ipfs.filebase.io/ipfs/QmNoZ6hT1fdCm8A9B4uzzT8CdqVucT7B5L23vtxP7giJLX',
          },
          expected: {
            id: 1,
            name: 'quan ao adidas',
            inputPrice: '100',
            outputPrice: '150',
            weight: '1',
            description: 'mô tả ở đây',
            inventoryNumber: 100,
            categoryId: 1,
            barcode: 'ABCD1234',
            avatar: 'https://ipfs.filebase.io/ipfs/QmNoZ6hT1fdCm8A9B4uzzT8CdqVucT7B5L23vtxP7giJLX',
            imgDetail:
              'https://ipfs.filebase.io/ipfs/QmNoZ6hT1fdCm8A9B4uzzT8CdqVucT7B5L23vtxP7giJLX',
          },
          barcode: 'ABCD1234',
        },
      ]

      test.each(table)('params: $params', async ({ params, expected, barcode }) => {
        const generateRandomBarcodeSpy = jest
          .spyOn(itemServices, 'generateRandomBarcode')
          .mockReturnValueOnce(barcode)

        const actualReturn = await itemServices.createItem(params)

        expect(generateRandomBarcodeSpy).toHaveBeenCalled()

        generateRandomBarcodeSpy.mockRestore()

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })

  describe('#generateRandomBarcode()', () => {
    describe('should return success and expected', () => {
      test('test generateRandomBarcode', async () => {
        const actualReturn = itemServices.generateRandomBarcode()

        expect(typeof actualReturn).toBe('string')
      })
    })
  })

  describe('#getListItems()', () => {
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
                name: 'quan ao adidas',
                inputPrice: '100',
                outputPrice: '150',
                weight: '1',
                description: 'mô tả ở đây',
                inventoryNumber: 100,
                categoryId: 1,
                barcode: 'ABCD1234',
                avatar:
                  'https://ipfs.filebase.io/ipfs/QmNoZ6hT1fdCm8A9B4uzzT8CdqVucT7B5L23vtxP7giJLX',
                imgDetail:
                  'https://ipfs.filebase.io/ipfs/QmNoZ6hT1fdCm8A9B4uzzT8CdqVucT7B5L23vtxP7giJLX',
              },
            ],
          },
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const actualReturn = await itemServices.getListItems(params.pagination)

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })

  describe('#updateItem()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            id: 1,
            name: 'quan ao nike',
            outputPrice: '200',
            description: 'mô tả ở đây nhé',
            inventoryNumber: 90,
            avatar: 'https://ipfs.filebase.io/ipfs/QmPrArqsB3UVfgeNcu17Zp2QxsK1SyJKmL8X21DXoyiuy4',
            imgDetail:
              'https://ipfs.filebase.io/ipfs/QmNoZ6hT1fdCm8A9B4uzzT8CdqVucT7B5L23vtxP7giJLX',
          },
          expected: [1],
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const actualReturn = await itemServices.updateItem(params)

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })

  describe('#deleteItem()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            id: 1,
          },
          expected: true,
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const cartItemRepositorySpy = jest
          .spyOn(cartItemRepository, 'deleteByCondition')
          .mockResolvedValue(1)

        const flashSaleItemRepositorySpy = jest
          .spyOn(flashSaleItemRepository, 'deleteByCondition')
          .mockResolvedValue(1)

        const actualReturn = await itemServices.deleteItem(params.id)

        expect(cartItemRepositorySpy).toHaveBeenCalledWith({ itemId: 1 }, expect.anything())

        expect(flashSaleItemRepositorySpy).toHaveBeenCalledWith({ itemId: 1 }, expect.anything())

        flashSaleItemRepositorySpy.mockRestore()
        cartItemRepositorySpy.mockRestore()

        expect(actualReturn).toBe(expected)
      })
    })
  })
})
