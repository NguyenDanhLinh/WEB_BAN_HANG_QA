import { Container } from 'typedi'
import UserServices from '@services/users.service'

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
})
