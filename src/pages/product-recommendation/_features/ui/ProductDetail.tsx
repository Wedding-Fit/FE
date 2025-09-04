import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Card from '../../../../shared/components/Card';
import { AiOutlineBulb } from 'react-icons/ai';
import type { TabKey } from '../../_entities/productRecommendation';
import {
  getDepositDetail,
  getSavingDetail,
  getPersonalCreditLoanDetail,
  getJeonseLoanDetail,
} from '../../_features/services/productList.service';

type AnyItem = {
  id?: number;
  depositSavingId?: number;
  personalCreditLoanId?: number;
  jeonseLoanId?: number;

  name: string;
  bank?: string;
  financialCompanyName?: string;

  interestRate?: number;
  maxInterestRate?: number;
  baseRate?: number;
  maxRate?: number;
  saveMonth?: number | string;

  crdtGradAvg?: number;
  joinWay?: string;

  lendRateMin?: number;
  lendRateMax?: number;

  etcNote?: string | string[];
  contactNumber?: string;
  productUrl?: string;
  extraInfo?: string;
};

const toNum = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};
const pct = (v: unknown) => {
  const n = toNum(v);
  return n === undefined ? '-' : n.toFixed(2);
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { state } = useLocation() as { state?: { type?: TabKey } };
  const activeTab = state?.type;

  const [item, setItem] = useState<AnyItem | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id || !activeTab) return;
      const nid = Number(id);
      if (activeTab === 'deposit') {
        const res = await getDepositDetail(nid);
        setItem(res.data as AnyItem);
      } else if (activeTab === 'saving') {
        const res = await getSavingDetail(nid);
        setItem(res.data as AnyItem);
      } else if (activeTab === 'personal-credit-loans') {
        const res = await getPersonalCreditLoanDetail(nid);
        setItem(res.data as AnyItem);
      } else if (activeTab === 'jeonse-loans') {
        const res = await getJeonseLoanDetail(nid);
        setItem(res.data as AnyItem);
      }
    };
    fetchDetail();
  }, [id, activeTab]);

  if (!item || !activeTab) {
    return (
      <div>
        <div className="text-sm text-gray-600">
          상세 정보를 불러올 수 없습니다. 목록에서 다시 진입해 주세요.
        </div>
        {id && <div className="mt-2 text-xs text-gray-400">요청 ID: {id}</div>}
        <button className="mt-3 text-sm underline" onClick={() => navigate(-1)}>
          뒤로가기
        </button>
      </div>
    );
  }

  const bankName = item.bank ?? item.financialCompanyName ?? '';
  const period =
    activeTab === 'deposit' || activeTab === 'saving'
      ? item.saveMonth
        ? `${item.saveMonth}개월`
        : '-'
      : '-';

  const etcNotes =
    typeof item.etcNote === 'string' ? [item.etcNote] : item.etcNote ?? [];

  return (
    <div className="space-y-4 mt-[10px]">
      <Card>
        <div className="flex-1">
          <div className="text-subTitle mb-3 flex items-center gap-1">
            <AiOutlineBulb className="shrink-0" />
            <div>상품 개요</div>
          </div>

          <div className="grid grid-cols-3 gap-y-2">
            <div className="text-bodyBold">상품명</div>
            <div className="col-span-2 text-placehold text-right">
              {item.name}
            </div>

            <div className="text-bodyBold">은행</div>
            <div className="col-span-2 text-placehold text-right">
              {bankName}
            </div>

            {activeTab === 'personal-credit-loans' ? (
              <>
                <div className="text-bodyBold">평균 금리</div>
                <div className="col-span-2 text-placehold text-right">
                  {pct(item.crdtGradAvg)}%
                </div>
                {item.joinWay && (
                  <>
                    <div className="text-bodyBold">가입 방법</div>
                    <div className="col-span-2 text-placehold text-right">
                      {item.joinWay}
                    </div>
                  </>
                )}
              </>
            ) : activeTab === 'jeonse-loans' ? (
              <>
                <div className="text-bodyBold">최저 금리</div>
                <div className="col-span-2 text-placehold text-right">
                  {pct(item.lendRateMin)}%
                </div>
                <div className="text-bodyBold">최대 금리</div>
                <div className="col-span-2 text-placehold text-right">
                  {pct(item.lendRateMax)}%
                </div>
              </>
            ) : (
              <>
                <div className="text-bodyBold">기본 금리</div>
                <div className="col-span-2 text-right text-placehold text-red-dark">
                  {pct(item.interestRate)}%
                </div>
                <div className="text-bodyBold">최대 금리</div>
                <div className="col-span-2 text-right text-placehold text-red-default">
                  {pct(item.maxInterestRate)}%
                </div>
                <div className="text-bodyBold">기간</div>
                <div className="col-span-2 text-placehold text-right">
                  {period}
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {etcNotes.length > 0 && (
        <Card>
          <div className="flex-1">
            <div className="text-subTitle mb-2 flex items-center gap-1">
              <AiOutlineBulb className="shrink-0" />
              <div>유의 사항</div>
            </div>
            <ul className="list-disc list-inside text-bodyBold leading-6">
              {etcNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      <Card>
        <div className="flex-1">
          <div className="text-subTitle mb-2 flex items-center gap-1">
            <AiOutlineBulb className="shrink-0" />
            <div>상품 상세 정보</div>
          </div>

          <div className="text-bodyBold grid grid-cols-[84px,1fr] items-start gap-x-6 gap-y-2">
            <div className="whitespace-nowrap">연락처</div>
            <div>{item.contactNumber ?? '-'}</div>

            <div className="whitespace-nowrap">웹사이트</div>
            <div>
              {item.productUrl ? (
                <a
                  href={item.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {item.productUrl}
                </a>
              ) : (
                '-'
              )}
            </div>

            <div className="whitespace-nowrap">추가 정보</div>
            <div>{item.extraInfo ?? '-'}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
