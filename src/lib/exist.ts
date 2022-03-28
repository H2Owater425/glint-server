import {getFirestore} from 'firebase-admin/firestore'

async function isIdExist(id: string): Promise<boolean> {
  const userDoc = getFirestore().collection('users')
  const snapShot = await userDoc.where('id', '==', id).get()
  return snapShot.empty
}

async function isUserExist(uuid: string): Promise<boolean> {
  const user = getFirestore().doc(uuid)
  return !(await user.get()).exists
}

export {isIdExist, isUserExist}
