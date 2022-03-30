import {Router, Request, Response, NextFunction} from 'express'
import {getFirestore} from 'firebase-admin/firestore'
import controllers from '../../interface/controllers'
import bodyValidator from '../../middleware/validator'
import HttpException from '../../exceptions/http'
import UserDto from './user.dto'
import {v5 as uuidv5} from 'uuid'
import {isIdExist, isUserExist} from '@lib/exist'

class Resigter implements controllers {
  public path = '/register'
  public router = Router()

  constructor() {
    this.initializeRouter()
  }

  private initializeRouter() {
    this.router.post('/add', bodyValidator(UserDto), this.addUser)
  }

  private async addUser(req: Request, res: Response, next: NextFunction) {
    const body = req.body
    const uuid = uuidv5(body.email, uuidv5.URL)
    const db = getFirestore()
    const userRef = db.collection('users')
    const userDoc = userRef.doc(uuid)

    try {
      if (await isUserExist(uuid)) {
        next(new HttpException(400, 'existing email'))
      }

      if(await isIdExist(body.id)) {
        next(new HttpException(400, 'existing id'))
      }
      
      await userDoc.set({...body}) // save data
      res.json({message: 'sucess'})
    } catch (error) {
      console.log(error)
      next(new HttpException(500, 'server error'))
    }
  }
}

export default Resigter
