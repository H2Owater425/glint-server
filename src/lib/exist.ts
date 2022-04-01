import { getFirestore } from 'firebase-admin/firestore'

async function idExist(id: string): Promise<boolean> {
  const userDoc = getFirestore().collection('users')
  const snapShot = await userDoc.where('id', '==', id).get()
  return snapShot.empty
}

async function emailExist(uuid: string): Promise<boolean> {
  const user = getFirestore().collection('users').doc(uuid)
  return (await user.get()).exists
}

export { idExist, emailExist }
