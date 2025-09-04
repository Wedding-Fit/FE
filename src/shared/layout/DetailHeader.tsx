import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface DetailHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  right?: ReactNode;
  className?: string;
}

const DEFAULT_TITLE = '[상품 상세보기]';
const DEFAULT_SUBTITLE = '미래를 같이 준비할 상품을 찾아봐요';

const DetailHeader = ({
  title,
  subtitle,
  onBack,
  right,
  className = '',
}: DetailHeaderProps) => {
  const navigate = useNavigate();
  const handleBack = () => (onBack ? onBack() : navigate(-1));

  const resolvedTitle = title ?? DEFAULT_TITLE;
  const resolvedSubtitle = subtitle ?? DEFAULT_SUBTITLE;

  return (
    <header
      className={`w-full max-w-[412px] mx-auto h-20 px-4 flex items-center justify-between bg-white fixed top-0 left-0 right-0 z-10 ${className}`}
    >
      <div className="flex items-center gap-3">
        <button onClick={handleBack} aria-label="뒤로가기">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="leading-tight">
          <div className="font-semibold">{resolvedTitle}</div>
          {resolvedSubtitle && (
            <div className="text-body">{resolvedSubtitle}</div>
          )}
        </div>
      </div>

      {right ? <div className="shrink-0">{right}</div> : null}
    </header>
  );
};

export default DetailHeader;
