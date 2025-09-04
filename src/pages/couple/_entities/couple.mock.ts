import type { CoupleInfoResponse, CoupleIdResponse } from "./couple.entity"

export const mockCoupleInfo: CoupleInfoResponse = {
  loginId: "test1234",
  region: "서울특별시",
  weddingType: "스몰 웨딩",
  honeymoonBudget: true,
  photoPackage: true,
  dressMakeup: true,
  weddingDate: "2025-08-30",
}

export const mockCoupleIdResponse: CoupleIdResponse = {
  coupleId: 1,
}