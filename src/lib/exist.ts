import { getFirestore } from 'firebase-admin/firestore'

export async function isExistingId(id: string): Promise<boolean> {
  return !(await getFirestore().collection('users').where('id', '==', id).get())
    .empty
}

export async function isExistingEmail(uuid: string): Promise<boolean> {
  return (await getFirestore().collection('users').doc(uuid).get()).exists
}