import { Request, Response, NextFunction } from 'express'
import { getFirestore } from 'firebase-admin/firestore'
import { v5 as uuidv5 } from 'uuid'
import { isIdExists, isEmailExists } from '@lib/exist'
import HttpException from '@exceptions/http'

export default async function addUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body
  const uuid = uuidv5(body.email, uuidv5.URL)
  const db = getFirestore()
  const userRef = db.collection('users')
  const userDoc = userRef.doc(uuid)

  try {
    if (await isIdExists(uuid)) {
      next(new HttpException(400, 'existing email'))
      return
    }

    if (await isEmailExists(body.id)) {
      next(new HttpException(400, 'existing id'))
      return
    }

    await userDoc.set({ ...body }) // save data
    res.json({ message: 'sucess' })
  } catch (error) {
    console.log(error)
    next(new HttpException(500, 'server error'))
  }
}
