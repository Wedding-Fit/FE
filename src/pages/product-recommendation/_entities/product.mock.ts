export type TabKey =
  | 'deposit'
  | 'saving'
  | 'personal-credit-loans'
  | 'jeonse-loans';

export interface ProductListItem {
  id: number;
  name: string;
  bank: string;

  interestRate?: number;
  maxInterestRate?: number;
  saveMonth?: number;

  crdtGradAvg?: number;
  joinWay?: string;

  lendRateMin?: number;
  lendRateMax?: number;

  etcNote?: string[];
  contactNumber?: string;
  productUrl?: string;
  extraInfo?: string;
}

export const mockData: Record<TabKey, ProductListItem[]> = {
  deposit: [
    {
      id: 1,
      name: '하나 원가예금',
      bank: '하나은행',
      interestRate: 4.21,
      maxInterestRate: 4.8,
      saveMonth: 12,
      etcNote: [
        '우대금리는 조건 충족 시 적용됩니다.',
        '중도 해지 시 중도해지 이율이 적용됩니다.',
        '금리는 예고 없이 변경될 수 있습니다.',
      ],
      contactNumber: '1588-1111',
      productUrl: 'https://www.hanabank.com',
      extraInfo: '급여이체 및 자동이체 3건 이상 등록 시 우대 금리 제공.',
    },
    {
      id: 2,
      name: '신한 쏠편한 정기예금',
      bank: '신한은행',
      interestRate: 3.95,
      maxInterestRate: 4.5,
      saveMonth: 24,
      etcNote: [
        '모바일 신규 시 우대금리 추가 제공될 수 있습니다.',
        '만기 전 해지 시 중도해지 이율 적용.',
      ],
      contactNumber: '1577-8000',
      productUrl: 'https://www.shinhan.com',
      extraInfo: 'SOL 앱 신규 이벤트 기간 중 추가 우대 가능.',
    },
  ],
  saving: [
    {
      id: 11,
      name: '카뱅 자유적금',
      bank: '카카오뱅크',
      interestRate: 3.4,
      maxInterestRate: 4.1,
      saveMonth: 12,
      etcNote: [
        '자동이체 납입 시 우대금리 적용.',
        '납입일 미준수 시 일부 혜택이 제한될 수 있습니다.',
      ],
      contactNumber: '1599-3333',
      productUrl: 'https://www.kakaobank.com',
      extraInfo: '만 19~34세 청년 대상 추가 이벤트 수시 진행.',
    },
    {
      id: 12,
      name: '토스 만만적금',
      bank: '토스뱅크',
      interestRate: 3.2,
      maxInterestRate: 3.9,
      saveMonth: 6,
      etcNote: [
        '우대금리 조건(자동이체/카드이용 등) 충족 시 적용.',
        '상품·이벤트 조건은 변경될 수 있습니다.',
      ],
      contactNumber: '1599-4905',
      productUrl: 'https://www.tossbank.com',
      extraInfo: '토스뱅크 체크카드 이용 시 추가 우대 가능.',
    },
  ],
  'personal-credit-loans': [
    {
      id: 21,
      name: '하나 신용대출',
      bank: '하나은행',
      joinWay: '영업점/비대면 가입 가능',
      crdtGradAvg: 5.2,
      contactNumber: '1588-1111',
      productUrl: 'https://www.hanabank.com',
      extraInfo: '직장인 간편서류 제출 프로세스 지원.',
    },
    {
      id: 22,
      name: '신한 프리미엄 신용대출',
      bank: '신한은행',
      joinWay: '영업점/비대면 가입 가능',
      crdtGradAvg: 4.85,
      contactNumber: '1577-8000',
      productUrl: 'https://www.shinhan.com',
      extraInfo: '신속 심사 및 모바일 약정 지원.',
    },
  ],
  'jeonse-loans': [
    {
      id: 31,
      name: '하나 전세자금 대출',
      bank: '하나은행',
      lendRateMin: 3.1,
      lendRateMax: 4.5,
      contactNumber: '1588-1111',
      productUrl: 'https://www.hanabank.com',
      extraInfo: '주택도시보증공사(HUG), SGI 등 보증 연계 상품 제공.',
    },
    {
      id: 32,
      name: '신한 안심 전세대출',
      bank: '신한은행',
      lendRateMin: 3.5,
      lendRateMax: 4.2,
      contactNumber: '1577-8000',
      productUrl: 'https://www.shinhan.com',
      extraInfo: '청년·신혼부부 대상 우대 프로그램 별도 운영.',
    },
  ],
};
