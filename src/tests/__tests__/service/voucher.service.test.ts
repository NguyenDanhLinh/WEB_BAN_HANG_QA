import { HttpException } from '@exceptions/http.exception'
import { Pagination } from '@interfaces/pagination.interface'
import { CreateVoucherInterface, UpdateVoucherInterface } from '@interfaces/voucher.interface'
import VoucherServices from '@services/voucher.service'
import { Container } from 'typedi'

const voucherServices = Container.get(VoucherServices)

describe('voucher.service.ts', () => {
  describe('#createVoucher()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            name: 'giam 2000',
            percent: 0,
            moneyReduced: '2000',
            startDate: new Date('2023-08-09T02:20:00Z'),
            endDate: new Date('2023-08-09T02:20:00Z'),
            inventoryNumber: 3,
          } as CreateVoucherInterface,
          expected: {
            name: 'giam 2000',
            percent: 0,
            moneyReduced: '2000',
            startDate: new Date('2023-08-09T02:20:00Z'),
            endDate: new Date('2023-08-09T02:20:00Z'),
            inventoryNumber: 3,
            barcode: 'ABCD1234',
          },
          barcode: 'ABCD1234',
        },
      ]

      test.each(table)('params: $params', async ({ params, expected, barcode }) => {
        const generateRandomBarcodeSpy = jest
          .spyOn(voucherServices, 'generateRandomBarcode')
          .mockReturnValueOnce(barcode)

        const actualReturn = await voucherServices.createVoucher(params)

        expect(generateRandomBarcodeSpy).toHaveBeenCalled()

        generateRandomBarcodeSpy.mockRestore()

        expect(actualReturn).toMatchObject(expected)
      })
    })

    describe('percent > 100, should throw HttpException The amount of reduction is too big', () => {
      const table = [
        {
          params: {
            name: 'giam 105%',
            percent: 105,
            moneyReduced: '0',
            startDate: new Date('2023-08-09T02:20:00Z'),
            endDate: new Date('2023-08-09T02:20:00Z'),
            inventoryNumber: 3,
          } as CreateVoucherInterface,
          expected: new HttpException(400, 'The amount of reduction is too big'),
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        await expect(voucherServices.createVoucher(params)).rejects.toThrow(expected)
      })
    })
  })

  describe('#generateRandomBarcode()', () => {
    describe('should return success and expected', () => {
      test('test generateRandomBarcode', async () => {
        const actualReturn = voucherServices.generateRandomBarcode()

        expect(typeof actualReturn).toBe('string')
      })
    })
  })

  describe('#updateVoucher()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            voucherId: 1,
            name: 'giam 60%',
            percent: 60,
            moneyReduced: '0',
            startDate: new Date('2023-08-06T08:02:00Z'),
            endDate: new Date('2023-08-07T04:40:00Z'),
            inventoryNumber: 10,
          } as UpdateVoucherInterface,

          expected: [1],
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const actualReturn = await voucherServices.updateVoucher(params)

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })

  describe('#getListVoucher()', () => {
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
                name: 'giam 60%',
                percent: 60,
                moneyReduced: '0',
                startDate: new Date('2023-08-06T08:02:00Z'),
                endDate: new Date('2023-08-07T04:40:00Z'),
                inventoryNumber: 10,
              },
            ],
          },
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const actualReturn = await voucherServices.getListVoucher(params.pagination)

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })
})
