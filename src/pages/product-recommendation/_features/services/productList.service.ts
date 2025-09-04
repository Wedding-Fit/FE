import { fetcher } from '../../../../shared/utils/fetcher';
import type {
  DepositSavingItem,
  DepositSavingListPayload,
  PersonalCreditLoanItem,
  PersonalCreditLoanListPayload,
  JeonseLoanItem,
  JeonseLoanListPayload,
} from '../../_entities/productRecommendation';
import { mockData } from '../../_entities/product.mock';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const withPaging = <T>(list: T[], page: number, size: number) => {
  const totalCount = list.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / size));
  const start = page * size;
  const end = start + size;
  const sliced = list.slice(start, end);
  return { sliced, page, size, totalPages, totalCount };
};

const sortWithAccessors = <T>(
  list: T[],
  field: string,
  dir: 'ASC' | 'DESC',
  accessors: Record<string, (x: T) => number>
) => {
  const getter = accessors[field] ?? (() => 0);
  return [...list].sort((a, b) => {
    const diff = getter(a) - getter(b);
    return dir === 'DESC' ? -diff : diff;
  });
};

export const getDepositList = async (
  page = 0,
  size = 10,
  sort = 'maxInterestRate,DESC'
) => {
  try {
    return await fetcher<DepositSavingListPayload>({
      url: `${BASE_URL}/api/deposit-savings/deposit?page=${page}&size=${size}&sort=${sort}`,
      method: 'GET',
      auth: true,
    });
  } catch {
    const [field, dirRaw] = String(sort).split(',');
    const dir = (dirRaw === 'ASC' ? 'ASC' : 'DESC') as 'ASC' | 'DESC';

    const accessors = {
      maxInterestRate: (p: any) => Number(p.maxInterestRate ?? p.maxRate ?? 0),
      interestRate: (p: any) => Number(p.interestRate ?? p.baseRate ?? 0),
    };

    const sorted = sortWithAccessors(
      mockData.deposit as any[],
      field,
      dir,
      accessors
    );
    const { sliced, totalPages, totalCount } = withPaging(sorted, page, size);

    return {
      code: 200,
      message: '성공했습니다',
      data: {
        depositSavingList: sliced,
        page,
        size,
        totalPages,
        totalCount,
      },
    };
  }
};

export const getDepositDetail = async (id: number) => {
  try {
    return await fetcher<DepositSavingItem>({
      url: `${BASE_URL}/api/deposit-savings/deposit/${id}`,
      method: 'GET',
      auth: true,
    });
  } catch {
    const found =
      (mockData.deposit as any[]).find((d: any) => d.id === id) ??
      mockData.deposit[0];
    return {
      code: 200,
      message: '성공했습니다',
      data: found,
    };
  }
};

export const getSavingList = async (
  page = 0,
  size = 10,
  sort = 'maxInterestRate,DESC'
) => {
  try {
    return await fetcher<DepositSavingListPayload>({
      url: `${BASE_URL}/api/deposit-savings/saving?page=${page}&size=${size}&sort=${sort}`,
      method: 'GET',
      auth: true,
    });
  } catch {
    const [field, dirRaw] = String(sort).split(',');
    const dir = (dirRaw === 'ASC' ? 'ASC' : 'DESC') as 'ASC' | 'DESC';

    const accessors = {
      maxInterestRate: (p: any) => Number(p.maxInterestRate ?? p.maxRate ?? 0),
      interestRate: (p: any) => Number(p.interestRate ?? p.baseRate ?? 0),
    };

    const sorted = sortWithAccessors(
      mockData.saving as any[],
      field,
      dir,
      accessors
    );
    const { sliced, totalPages, totalCount } = withPaging(sorted, page, size);

    return {
      code: 200,
      message: '성공했습니다',
      data: {
        depositSavingList: sliced, // 통일
        page,
        size,
        totalPages,
        totalCount,
      },
    };
  }
};

export const getSavingDetail = async (id: number) => {
  try {
    return await fetcher<DepositSavingItem>({
      url: `${BASE_URL}/api/deposit-savings/saving/${id}`,
      method: 'GET',
      auth: true,
    });
  } catch {
    const found =
      (mockData.saving as any[]).find((s: any) => s.id === id) ??
      mockData.saving[0];
    return {
      code: 200,
      message: '성공했습니다',
      data: found,
    };
  }
};

export const getPersonalCreditLoanList = async (page = 0, size = 10) => {
  try {
    return await fetcher<PersonalCreditLoanListPayload>({
      url: `${BASE_URL}/api/personal-credit-loans?page=${page}&size=${size}`,
      method: 'GET',
      auth: true,
    });
  } catch {
    const { sliced, totalPages, totalCount } = withPaging(
      mockData['personal-credit-loans'],
      page,
      size
    );
    return {
      code: 200,
      message: '성공했습니다',
      data: {
        personalCreditLoanList: sliced,
        page,
        size,
        totalPages,
        totalCount,
      },
    };
  }
};

export const getPersonalCreditLoanDetail = async (id: number) => {
  try {
    return await fetcher<PersonalCreditLoanItem>({
      url: `${BASE_URL}/api/personal-credit-loans/${id}`,
      method: 'GET',
      auth: true,
    });
  } catch {
    const found =
      (mockData['personal-credit-loans'] as any[]).find(
        (p: any) => p.id === id
      ) ?? mockData['personal-credit-loans'][0];
    return {
      code: 200,
      message: '성공했습니다',
      data: found,
    };
  }
};

export const getJeonseLoanList = async (
  page = 0,
  size = 10,
  sort = 'lendRateMax,ASC'
) => {
  try {
    return await fetcher<JeonseLoanListPayload>({
      url: `${BASE_URL}/api/jeonse-loans?page=${page}&size=${size}&sort=${sort}`,
      method: 'GET',
      auth: true,
    });
  } catch {
    const [field, dirRaw] = String(sort).split(',');
    const dir = (dirRaw === 'ASC' ? 'ASC' : 'DESC') as 'ASC' | 'DESC';

    const accessors = {
      lendRateMax: (p: any) => Number(p.lendRateMax ?? p.maxRate ?? 0),
      lendRateMin: (p: any) => Number(p.lendRateMin ?? p.baseRate ?? 0),
    };

    const sorted = sortWithAccessors(
      mockData['jeonse-loans'] as any[],
      field,
      dir,
      accessors
    );
    const { sliced, totalPages, totalCount } = withPaging(sorted, page, size);

    return {
      code: 200,
      message: '성공했습니다',
      data: {
        jeonseLoanList: sliced,
        page,
        size,
        totalPages,
        totalCount,
      },
    };
  }
};

export const getJeonseLoanDetail = async (id: number) => {
  try {
    return await fetcher<JeonseLoanItem>({
      url: `${BASE_URL}/api/jeonse-loans/${id}`,
      method: 'GET',
      auth: true,
    });
  } catch {
    const found =
      (mockData['jeonse-loans'] as any[]).find((j: any) => j.id === id) ??
      mockData['jeonse-loans'][0];
    return {
      code: 200,
      message: '성공했습니다',
      data: found,
    };
  }
};
