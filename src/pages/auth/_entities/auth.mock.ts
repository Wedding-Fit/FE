import type { SignInResponse } from "./auth.entity"

export const mockLoginSuccessResponse: SignInResponse = {
  userId: 1,
  nickname: "그린티",
  accessToken: "mocked-access-token",
  coupleId: 1, 
}

export const mockLoginFailResponse = {
  code: 401,
  message: "아이디 또는 비밀번호가 올바르지 않습니다",
  data: null,
}