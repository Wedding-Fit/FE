import { create } from 'zustand'
import type { SignInResponse } from './auth.entity'

interface AuthState {
  accessToken: string | null
  userId: number | null
  nickname: string
  coupleId: number | null

  setAuth: (data: SignInResponse) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  userId: null,
  nickname: '',
  coupleId: null,

  setAuth: (data) =>
    set({
      accessToken: data.accessToken,
      userId: data.userId,
      nickname: data.nickname,
      coupleId: data.coupleId ?? null,
    }),

  clearAuth: () =>
    set({
      accessToken: null,
      userId: null,
      nickname: '',
      coupleId: null,
    }),
}))