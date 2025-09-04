// PNG들을 타입 안전하게 불러와서 객체로 내보냅니다.
import busan from './bank/busan.png';
import city from './bank/city.png';
import cu from './bank/cu.png';
import dgb from './bank/dgb.png';
import gwangju from './bank/gwangju.png';
import hana from './bank/hana.png';
import ibk from './bank/ibk.png';
import im from './bank/im.png';
import k from './bank/k.png';
import kakao from './bank/kakao.png';
import kb from './bank/kb.png';
import kdb from './bank/kdb.png';
import mg from './bank/mg.png';
import nh from './bank/nh.png';
import post from './bank/post.png';
import sc from './bank/sc.png';
import sh from './bank/sh.png';
import shinhan from './bank/shinhan.png';
import toss from './bank/toss.png';
import woori from './bank/woori.png';

export const Banks = {
  busan,
  city,
  cu,
  dgb,
  gwangju,
  hana,
  ibk,
  im,
  k, // 케이뱅크
  kakao,
  kb, // KB국민
  kdb, // 산업은행
  mg, // 새마을
  nh, // 농협
  post, // 우체국
  sc, // SC제일
  sh, // 수협
  shinhan,
  toss,
  woori,
} as const;

// Banks 객체의 키 타입 (예: 'kb' | 'hana' | ...)
export type BankKey = keyof typeof Banks;

/** 은행명 문자열 → Banks 키 매핑 규칙 */
const BANK_MATCHERS: Array<[RegExp, BankKey]> = [
  [/국민|kb/i, 'kb'],
  [/신한/i, 'shinhan'],
  [/하나/i, 'hana'],
  [/우리/i, 'woori'],
  [/농협|nh/i, 'nh'],
  [/기업|ibk/i, 'ibk'],
  [/카카오/i, 'kakao'],
  [/케이뱅크|k[-\s]?bank/i, 'k'],
  [/토스/i, 'toss'],
  [/씨티|citibank|city/i, 'city'],
  [/sc|제일/i, 'sc'],
  [/수협|sh수협/i, 'sh'],
  [/부산/i, 'busan'],
  [/대구|dgb/i, 'dgb'],
  [/광주/i, 'gwangju'],
  [/산업|kdb/i, 'kdb'],
  [/우체국|post/i, 'post'],
  [/새마을|mg/i, 'mg'],
  [/신협|credit\s?union|cu/i, 'cu'],
  [/\biM\b|im/i, 'im'],
];

/** 은행명으로 로고 src를 반환 (없으면 undefined) */
export function logoByBankName(bankName?: string): string | undefined {
  if (!bankName) return;
  for (const [re, key] of BANK_MATCHERS) {
    if (re.test(bankName)) return Banks[key];
  }
  return;
}
