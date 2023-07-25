const wrapValuesWithDateTime = require('../utils/wrapValuesWithDateTime.ts')

const users = [
  {
    id: 1,
    user_name: 'linh2001',
    password: '$2b$10$WfEZajtQa.vGoJ2CWHReGOchErJYxsSDN1IJMgD6HA.3CIz7n87Bi',
    name: 'nguyen danh linh',
    role: 'admin',
    phone_number: '032932311',
    address: 'ba vi',
    email: 'nguyendanhlinh2001@gmail.com',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('users', wrapValuesWithDateTime(users))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('users', {
        id: users.map((collection) => collection.id),
      }),
    ]
  },
}

/*
import { hash } from 'bcrypt';
Promise.all(
    [
        'password01',
        'password02',
        'password03',
    ].map( it =>  hash(it, 10))
).then(it => console.log('>>>>>>>>>>>>>>>>>', it))
*/
