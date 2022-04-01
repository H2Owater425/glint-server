import bodyValidator from '@middleware/validator'
import { IRouters } from '@Ctypes/index'

import addUser from './addUser.controller'
import UserDto from './user.dto'

const Register: IRouters = {
  root: '/register',
  routers: [
    {
      path: '/add',
      method: 'post',
      handler: addUser,
      middleware: [bodyValidator(UserDto)],
    },
  ],
}

export default Register
