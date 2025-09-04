import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SimpleDropdown from '../../../../shared/components/SimpleDropdown';
import ProductList from './ProductList';
import MiniButton from '../../../../shared/components/MiniButton';

import type { TabKey } from '../../_entities/productRecommendation';
import {
  getDepositList,
  getSavingList,
  getPersonalCreditLoanList,
  getJeonseLoanList,
} from '../../_features/services/productList.service';

type SortKey = string;

const tabs: { key: TabKey; label: string }[] = [
  { key: 'deposit', label: '예금' },
  { key: 'saving', label: '적금' },
  { key: 'personal-credit-loans', label: '개인 대출' },
  { key: 'jeonse-loans', label: '전세 대출' },
];

const TAB_SORT_OPTIONS: Record<TabKey, { key: SortKey; label: string }[]> = {
  deposit: [
    { key: 'maxInterestRate,DESC', label: '최대 금리 높은 순' }, // 기본
    { key: 'interestRate,DESC', label: '기본 금리 높은 순' },
  ],
  saving: [
    { key: 'maxInterestRate,DESC', label: '최대 금리 높은 순' }, // 기본
    { key: 'interestRate,DESC', label: '기본 금리 높은 순' },
  ],
  'personal-credit-loans': [], // 정렬 없음
  'jeonse-loans': [
    { key: 'lendRateMax,ASC', label: '최대 금리 낮은 순' }, // 기본
    { key: 'lendRateMin,ASC', label: '최저 금리 낮은 순' },
  ],
};

const ProductFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlTab = searchParams.get('tab') as TabKey | null;
  const tabKeys = tabs.map((t) => t.key);
  const initialTab: TabKey =
    urlTab && tabKeys.includes(urlTab) ? urlTab : 'deposit';

  const urlSort = searchParams.get('sort');
  const validSorts = (TAB_SORT_OPTIONS[initialTab] ?? []).map((o) => o.key);
  const initialSort: SortKey | null =
    urlSort && validSorts.includes(urlSort)
      ? urlSort
      : TAB_SORT_OPTIONS[initialTab][0]?.key ?? null;

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [sortOption, setSortOption] = useState<SortKey | null>(initialSort);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 탭 변경 시 정렬 옵션 보정
  useEffect(() => {
    const options = TAB_SORT_OPTIONS[activeTab];
    if (!options?.length) {
      setSortOption(null);
    } else if (!options.find((o) => o.key === sortOption)) {
      setSortOption(options[0].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // URL 동기화
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    next.set('tab', activeTab);
    if (sortOption) next.set('sort', sortOption);
    else next.delete('sort');
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, sortOption]);

  // 데이터 로드 (정렬은 서비스로 전달)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErr(null);
      try {
        if (activeTab === 'deposit') {
          const res = await getDepositList(
            0,
            10,
            sortOption ?? 'maxInterestRate,DESC'
          );
          setItems(res.data.depositSavingList);
        } else if (activeTab === 'saving') {
          const res = await getSavingList(
            0,
            10,
            sortOption ?? 'maxInterestRate,DESC'
          );
          setItems(res.data.depositSavingList);
        } else if (activeTab === 'personal-credit-loans') {
          const res = await getPersonalCreditLoanList(0, 10);
          setItems(res.data.personalCreditLoanList);
        } else if (activeTab === 'jeonse-loans') {
          const res = await getJeonseLoanList(
            0,
            10,
            sortOption ?? 'lendRateMax,ASC'
          );
          setItems(res.data.jeonseLoanList);
        }
      } catch (e: any) {
        setErr(e?.message ?? '목록을 불러오지 못했습니다.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab, sortOption]);

  const currentSortOptions = TAB_SORT_OPTIONS[activeTab];
  const dropdownOptions =
    currentSortOptions?.map((o) => ({ value: o.key, label: o.label })) ?? [];
  const selectedValue =
    typeof sortOption === 'string' &&
    dropdownOptions.some((o) => o.value === sortOption)
      ? sortOption
      : dropdownOptions[0]?.value ?? '';

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const baseCls = 'px-4 py-2 rounded-full border whitespace-nowrap';
          const activeCls = 'bg-red-dark border-red-dark';
          const inactiveCls = 'bg-white border-red-dark !text-black';
          return (
            <MiniButton
              key={tab.key}
              className={`${baseCls} ${isActive ? activeCls : inactiveCls}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </MiniButton>
          );
        })}
      </div>

      {dropdownOptions.length > 0 && (
        <div className="w-full mb-4 flex justify-end">
          <div className="min-w-[180px] translate-x-[45px] sm:translate-x-[36px] lg:translate-x-[48px]">
            <SimpleDropdown
              options={dropdownOptions}
              selectedValue={selectedValue}
              onSelect={(v: string) => setSortOption(v)}
            />
          </div>
        </div>
      )}

      {loading && (
        <div className="text-sm text-gray-500 px-2 py-4">불러오는 중…</div>
      )}
      {err && !loading && (
        <div className="text-sm text-red-600 px-2 py-4">{err}</div>
      )}
      {!loading && !err && <ProductList items={items} activeTab={activeTab} />}
    </div>
  );
};

export default ProductFilter;
