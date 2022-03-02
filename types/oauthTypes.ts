type googleDialogue = {
  client_id: string
  redirect_uri: string
  response_type: string
  scope: string
  state?: string
  access_type: string
  include_granted_scopes: string
}

type googleToken = {
  code: string
  client_id: string
  client_secret: string
  redirect_uri: string
  grant_type?: string
}

export { googleDialogue, googleToken }
