import express, {Request, Response} from 'express'
import cors from 'cors'
import {initializeApp, applicationDefault, cert} from 'firebase-admin/app'
import signup from './routers/signup'

const app = express()
const PORT: string | number = process.env.PORT || 3000

app.use(cors()) // allow all cors
app.use(express.json())

initializeApp()

app.use('/signup', signup)

app.get('/', (req: Request, res: Response) => {
  res.end()
})

app.get('/register', (req: Request, res: Response) => {
  res.send('')
})

app.listen(PORT, () => console.log(`listening on ${PORT}`))
