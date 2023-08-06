import { Request } from 'express'
import User from '@models/entities/users.entity'

export interface RequestWithUser extends Request {
  user: User
}
