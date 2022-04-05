import bodyValidator from '@middleware/validator'
import { IRouters } from '@Ctypes/index'
import addUser from './addUser.controller'
import UserDto from './user.dto'

// Register
export default {
  root: '/register',
  routers: [
    {
      path: '/add',
      method: 'post',
      handler: addUser,
      middleware: [bodyValidator(UserDto)],
    },
  ],
} as IRouters
