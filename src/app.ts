import express, {Application, Request, Response} from 'express'
import 'dotenv/config'

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
  res.send('<a href="/">login with google</a>')
})

app.get('/auth/google', (req: Request, res: Response) => {
  res.send('google oauth callback')
})

app.listen(3000)