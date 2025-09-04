export type TabKey =
  | 'deposit'
  | 'saving'
  | 'personal-credit-loans'
  | 'jeonse-loans';

export type SortKey = 'maxRate' | 'baseRate';

export type DepositSavingType = 'DEPOSIT' | 'SAVING';

export interface DepositSavingItem {
  depositSavingId: number;
  financialCompanyId: number;
  financialCompanyName: string;
  type: DepositSavingType;
  name: string;
  interestRate: number;
  maxInterestRate: number;
  saveMonth: number;
  etcNote: string;
  contactNumber: string;
  productUrl: string;
  extra_info: string;
}

export interface DepositSavingListPayload {
  depositSavingList: DepositSavingItem[];
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
}

export interface PersonalCreditLoanItem {
  personalCreditLoanId: number;
  financialCompanyId: number;
  financialCompanyName: string;
  name: string;
  joinWay: string;
  crdtGradAvg: number;
  contactNumber: string;
  productUrl: string;
  extra_info: string;
}

export interface PersonalCreditLoanListPayload {
  personalCreditLoanList: PersonalCreditLoanItem[];
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
}

export interface JeonseLoanItem {
  jeonseLoanId: number;
  financialCompanyId: number;
  financialCompanyName: string;
  name: string;
  lendRateMin: number;
  lendRateMax: number;
  lendRateAvg: number;
  loanLimit: string;
  erlyFee: string;
  dlyRate: string;
  contactNumber: string;
  productUrl: string;
  extra_info: string;
}

export interface JeonseLoanListPayload {
  jeonseLoanList: JeonseLoanItem[];
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
}

export interface ProductListItem {
  id: number;
  name: string;
  bank: string;
  baseRate: number;
  maxRate: number;
}
