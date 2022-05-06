import { Request, Response, NextFunction } from 'express'
import { getFirestore } from 'firebase-admin/firestore'
import { isExistingId, isExistingEmail } from '@lib/exist'
import HttpException from '@exceptions/http'
import UserDto from './user.dto'
import { createHash, pbkdf2Sync, randomBytes } from 'crypto'

// addUser
export default async function (
  request: Request<unknown, unknown, UserDto>,
  response: Response,
  next: NextFunction
): Promise<void> {
  const body: UserDto & { salt: string } = Object.assign(
    {},
    {
      email: request.body.email,
      name: request.body.name,
      id: request.body.id,
      password: request.body.password,
      birth: request.body.birth,
      salt: '',
    }
  )

  const id: string = createHash('sha256')
    .update(body.email)
    .digest()
    .toString('hex')

  try {
    if (await isExistingId(id)) {
      throw new HttpException(400, 'existing email')
    }

    if (await isExistingEmail(body.id)) {
      throw new HttpException(400, 'existing id')
    }

    body.salt = randomBytes(128).toString('base64')

    while (body.salt.charAt(body.salt.length - 1) === '=') {
      body.salt = body.salt.slice(0, -1)
    }

    body.password = pbkdf2Sync(
      body.email,
      body.salt,
      Number(process.env.PBKDF2_LOOP),
      32,
      'sha256'
    ).toString('hex')

    await getFirestore().collection('users').doc(id).set(body)

    response.jsend.success({ message: 'sucess' })
  } catch (error: any) {
    console.log(error.message)

    next(
      error instanceof HttpException
        ? error
        : new HttpException(500, 'server error')
    )
  }

  return
}
