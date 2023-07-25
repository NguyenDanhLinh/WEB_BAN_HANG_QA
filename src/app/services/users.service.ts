import { CreateUserInterface } from '@interfaces/user.interface'
import UserRepository from '@repositories/user.repository'
import { Service } from 'typedi'
import { hash } from 'bcrypt'

@Service()
class UserServices {
  constructor(protected userRepository: UserRepository) {}

  async getAll() {
    return this.userRepository.getAll()
  }

  async createUser(body: CreateUserInterface) {
    body.password = await hash(body.password, 10)

    return this.userRepository.create(body)
  }
}

export default UserServices
