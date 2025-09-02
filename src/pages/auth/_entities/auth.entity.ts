export interface SignInRequest {
    loginId: string;
    password: string;
  }
  
  export interface SignInResponse {
    userId: number;
    nickname: string;
    accessToken: string;
    coupleId?: number;
  }
  
  export interface SignUpRequest {
    loginId: string;
    password: string;
    name: string;
    nickname: string;
    birth: string; // ISO date (e.g., '1999-08-30')
    gender: 'MALE' | 'FEMALE'; // 또는 Gender enum 사용
    phoneNumber: string;
  }