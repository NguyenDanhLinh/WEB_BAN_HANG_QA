import { CreateUserInterface, UserLoginInterface } from '@interfaces/user.interface'
import UserRepository from '@repositories/user.repository'
import { Service } from 'typedi'
import { hash } from 'bcrypt'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { HttpException } from '@exceptions/http.exception'
import { env } from '@env'
import CronServices from 'vendor-services/cronJob.service'

@Service()
class UserServices {
  constructor(protected userRepository: UserRepository, protected cronServices: CronServices) {}

  async getAll() {
    return this.userRepository.getAll()
  }

  async createUser(body: CreateUserInterface) {
    body.password = await hash(body.password, 10)

    return this.userRepository.create(body)
  }

  async userLogin(body: UserLoginInterface) {
    const user = await this.userRepository.findByCondition({
      where: { userName: body.userName },
      raw: true,
    })

    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      throw new HttpException(400, 'wrong username or password')
    }

    delete user.password

    return jwt.sign(user, env.auth.jwtSecret)
  }

  async testConLog() {
    await this.cronServices.createScheduleLog(
      '2023-07-25 08:31:00 +00:00	',
      this.userRepository.getAll(),
    )
  }
}

export default UserServices
