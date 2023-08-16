import { Container } from 'typedi'
import UserServices from '@services/users.service'
import { HttpException } from '@exceptions/http.exception'

const userServices = Container.get(UserServices)

describe('users.service.ts', () => {
  describe('#getAll()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          expected: [
            {
              id: 1,
              userName: 'linh2001',
              name: 'nguyen danh linh',
              role: 'admin',
              phoneNumber: '032932311',
              address: 'ba vi',
              email: 'nguyendanhlinh2001@gmail.com',
            },
          ],
        },
      ]

      test.each(table)('return all user', async ({ expected }) => {
        const actualReturn = await userServices.getAll()

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })

  describe('#createUser()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            userName: 'linh1',
            password: 'linh1',
            name: 'linh1',
            phoneNumber: '0974072297',
            address: 'ba vi',
            email: 'linhtru2001@gmail.com',
          },
          expected: {
            userName: 'linh1',
            name: 'linh1',
            phoneNumber: '0974072297',
            address: 'ba vi',
            email: 'linhtru2001@gmail.com',
          },
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        const createMailVerifySpy = jest
          .spyOn(userServices, 'createMailVerify')
          .mockResolvedValue(undefined)

        const actualReturn = await userServices.createUser(params)

        expect(createMailVerifySpy).toHaveBeenCalledWith(params.email)

        createMailVerifySpy.mockRestore()

        expect(actualReturn).toMatchObject(expected)
      })
    })
  })

  describe('#userLogin()', () => {
    describe('should return success and expected', () => {
      const table = [
        {
          params: {
            userName: 'linh2001',
            password: 'linh2001',
          },
        },
      ]

      test.each(table)('params: $params', async ({ params }) => {
        const actualReturn = await userServices.userLogin(params)

        expect(typeof actualReturn).toBe('string')
      })
    })

    describe('throw HttpException because not verify email', () => {
      const table = [
        {
          params: {
            userName: 'linh1',
            password: 'linh1',
          },

          expected: new HttpException(400, 'wrong username or password or not verify email'),
        },
      ]

      test.each(table)('params: $params', async ({ params, expected }) => {
        await expect(userServices.userLogin(params)).rejects.toThrow(expected)
      })
    })
  })
})
