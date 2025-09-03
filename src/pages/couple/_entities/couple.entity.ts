export interface CoupleInfoResponse {
    loginId: string
    region: string
    weddingType: string
    honeymoonBudget: boolean
    photoPackage: boolean
    dressMakeup: boolean
    weddingDate: string // ISO 형식: '2025-08-30'
  }
  
  export interface CoupleFixRequest {
    region: string
    weddingType: string
    honeymoonBudget: boolean
    photoPackage: boolean
    dressMakeup: boolean
    weddingDate: string
  }
  
  export interface CoupleRegisterRequest extends CoupleFixRequest {
    loginId: string
  }
  
  export interface CoupleIdRequest {
    loginId: string
  }
  
  export interface CoupleIdResponse {
    coupleId: number
  }