import { fetcher } from "../../../../shared/utils/fetcher"
import type { SignInRequest, SignInResponse } from "../../_entities/auth.entity"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const signIn = (body: SignInRequest) => {
  return fetcher<SignInResponse>({
    url: `${BASE_URL}/auth/signin`,
    method: "POST",
    body : body,
  })
}