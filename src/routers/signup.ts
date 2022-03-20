import express, {Request, Response} from 'express'
import {getFirestore} from 'firebase-admin/firestore'

const router = express.Router()
const db = getFirestore()
const userCollection = db.collection('users')

router.post('/', (req: Request, res: Response) => {
  const profile = req.body
})

export default router
