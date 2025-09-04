import { fetcher } from "../../../../shared/utils/fetcher"
import type {
  CoupleFixRequest,
  CoupleIdResponse,
  CoupleInfoResponse,
  CoupleRegisterRequest
} from "../../_entities/couple.entity"
import {
  mockCoupleInfo,
  mockCoupleIdResponse
} from "../../_entities/couple.mock"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// 커플 정보 조회
export const getCoupleInfo = async (coupleId: number) => {
  try {
    return await fetcher<CoupleInfoResponse>({
      url: `${BASE_URL}/api/couple/${coupleId}`,
      method: "GET",
      auth: true,
    })
  } catch {
    return {
      code: 200,
      message: "성공했습니다",
      data: mockCoupleInfo,
    }
  }
}

// 커플 정보 수정
export const fixCoupleInfo = async (coupleFixRequest: CoupleFixRequest) => {
  try {
    return await fetcher<CoupleIdResponse>({
      url: `${BASE_URL}/api/couple/fix`,
      method: "PUT",
      body : coupleFixRequest,
      auth: true,
    })
  } catch {
    return {
      code: 200,
      message: "성공했습니다",
      data: mockCoupleIdResponse,
    }
  }
}

// 커플 ID 조회 (by loginId)
export const checkCoupleId = async (loginId: string) => {
  try {
    return await fetcher<CoupleIdResponse>({
      url: `${BASE_URL}/api/couple/check-id`,
      method: "POST",
      body : loginId,
      auth: true,
    })
  } catch {
    return {
      code: 200,
      message: "성공했습니다",
      data: mockCoupleIdResponse,
    }
  }
}

// 커플 등록
export const registerCouple = async (body: CoupleRegisterRequest) => {
  try {
    return await fetcher<CoupleIdResponse>({
      url: `${BASE_URL}/api/couple/register`,
      method: "POST",
      body,
      auth: true,
    })
  } catch {
    return {
      code: 200,
      message: "커플 등록에 성공했습니다",
      data: mockCoupleIdResponse,
    }
  }
}