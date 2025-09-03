import { fetcher } from "../../../../shared/utils/fetcher"
import type { SignInRequest, SignInResponse } from "../../_entities/auth.entity"
import { mockLoginSuccessResponse } from "../../_entities/auth.mock"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const signIn = async (body: SignInRequest) => {
  try {
    const res = await fetcher<SignInResponse>({
      url: `${BASE_URL}/auth/signin`,
      method: "POST",
      body : body,
    })
    return res
  }
  catch{
    return {
      code: 200,
      message: '성공했습니다',
      data: mockLoginSuccessResponse,
    }
  }
}