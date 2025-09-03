import { useAuthStore } from "../../pages/auth/_entities/auth.store"

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface BaseResponse<T> {
  code: number
  message: string
  data: T
}

export interface RequestOptions {
  url: string
  method: Method
  body?: any
  credentials?: RequestCredentials
  auth?: boolean
}

export const fetcher = async <T = any>({
  url,
  method,
  body,
  credentials = 'same-origin',
  auth = false,
}: RequestOptions): Promise<BaseResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (auth) {
      const { accessToken } = useAuthStore.getState()
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`
      }
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials,
    })

    const data: BaseResponse<T> = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'API 요청 중 오류가 발생했습니다.')
    }

    return data
  } catch (err: any) {
    console.error('[fetcher error]', err)
    throw err
  }
}