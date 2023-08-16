import { HttpException } from '@exceptions/http.exception'
import { CreateVoucherInterface, UpdateVoucherInterface } from '@interfaces/voucher.interface'
import VoucherServices from '@services/voucher.service'
import { Container } from 'typedi'
import CartServices from '@services/cart.service'
import { Pagination } from '@interfaces/pagination.interface'
import { UploadToFilebaseService } from '@common/services/upload_file.service'
import UploadServices from '@services/upload.service'
import { File } from '@interfaces/file.interface'

const uploadToFilebaseService = new UploadToFilebaseService()
const uploadServices = new UploadServices(uploadToFilebaseService)

describe('upload.service.ts', () => {
  describe('#upload()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            file: [
              {
                originalname: 'somefile',
                size: 1244,
                mimetype: 'png',
                extension: 'none',
                buffer: new Uint8Array([
                  84, 104, 105, 115, 32, 105, 115, 32, 97, 32, 85, 105, 110, 116, 56, 65, 114, 114,
                  97, 121, 32, 99, 111, 110, 118, 101, 114, 116, 101, 100, 32, 116, 111, 32, 97, 32,
                  115, 116, 114, 105, 110, 103,
                ]),
              },
            ],
          },
          expected: 'link file',
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const uploadToFilebaseServiceSpy = jest
          .spyOn(uploadToFilebaseService, 'uploadFile')
          .mockResolvedValue(expected)

        const actualReturn = await uploadServices.upload(params.file as any)

        expect(uploadToFilebaseServiceSpy).toHaveBeenCalledWith(params.file[0])

        uploadToFilebaseServiceSpy.mockRestore()

        expect(typeof actualReturn).toBe('string')
      })
    })
  })
})
