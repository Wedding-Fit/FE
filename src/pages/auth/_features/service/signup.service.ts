import { fetcher } from "../../../../shared/utils/fetcher"
import type { SignUpRequest } from '../../_entities/auth.entity'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const signUp = (body: SignUpRequest) => {
  return fetcher<void>({
    url: `${BASE_URL}/auth/join`,
    method: 'POST',
    body : body,
  })
}

export const checkIdDuplicate = (loginId: string) => {
  return fetcher<void>({
    url: `${BASE_URL}/auth/check-id`,
    method: 'POST',
    body:loginId
  })
}

export const checkNicknameDuplicate = (nickname: string) => {
  return fetcher<void>({
    url: `${BASE_URL}/auth/check-nickname`,
    method: 'POST',
    body:nickname
  })
}