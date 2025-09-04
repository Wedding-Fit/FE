import { useNavigate } from 'react-router-dom';
import Card from '../../../../shared/components/Card';
import { logoByBankName } from '../../../../asset/images';

type TabKey = 'deposit' | 'saving' | 'personal-credit-loans' | 'jeonse-loans';

type AnyItem = {
  id: number;
  name: string;
  bank: string;

  // 예·적금
  interestRate?: number | string;
  maxInterestRate?: number | string;
  baseRate?: number | string;
  maxRate?: number | string;

  // 개인대출
  crdtGradAvg?: number | string;

  // 전세대출
  lendRateMin?: number | string;
  lendRateMax?: number | string;
};

interface Props {
  items: AnyItem[];
  activeTab: TabKey;
}

const toNum = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

const fmtPct = (v: unknown) => {
  const n = toNum(v);
  return n === undefined ? '-' : n.toFixed(2);
};

const ProductList = ({ items, activeTab }: Props) => {
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="text-sm text-gray-500 px-2 py-4">
        표시할 상품이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[10px]">
      {items.map((p) => {
        const logoSrc = logoByBankName(p.bank);
        const fallback = (p.bank || '').replace(/\s/g, '').slice(0, 2);

        let rightBlock: React.ReactNode = null;

        if (activeTab === 'personal-credit-loans') {
          const avg = p.crdtGradAvg ?? p.baseRate ?? p.maxRate;
          rightBlock = (
            <div className="text-right text-sm text-gray-800">
              <div>평균 금리 연 {fmtPct(avg)}%</div>
            </div>
          );
        } else if (activeTab === 'jeonse-loans') {
          const min = p.lendRateMin ?? p.baseRate;
          const max = p.lendRateMax ?? p.maxRate;
          rightBlock = (
            <div className="text-right text-sm text-gray-800">
              <div>최저 금리 연 {fmtPct(min)}%</div>
              <div>최대 금리 연 {fmtPct(max)}%</div>
            </div>
          );
        } else {
          const base = p.interestRate ?? p.baseRate;
          const max = p.maxInterestRate ?? p.maxRate;
          rightBlock = (
            <div className="text-right text-body text-gray-800">
              <div>기본 금리 연 {fmtPct(base)}%</div>
              <div>최대 금리 연 {fmtPct(max)}%</div>
            </div>
          );
        }

        return (
          <button
            key={p.id}
            type="button"
            onClick={() =>
              navigate(`/product-recommendation/detail/${p.id}`, {
                state: { item: p, type: activeTab },
              })
            }
            className="text-left w-full"
          >
            <Card className="cursor-pointer">
              <div className="flex items-center gap-[10px]">
                <img
                  src={logoSrc}
                  alt={`${p.bank} 로고`}
                  className="h-9 w-9 rounded-full object-contain"
                />

                <div className="flex-1">
                  <div className="text-subTitle">{p.name}</div>
                  <div className="text-body text-gray-800">{p.bank}</div>
                </div>

                {rightBlock}
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
};

export default ProductList;
