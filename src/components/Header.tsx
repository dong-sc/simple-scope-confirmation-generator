import { legalDisclaimer } from '../utils/defaultScopeConfirmation';

const shortcuts = [
  {
    label: '報價單',
    href: 'https://dong-sc.github.io/simple-quote-generator/',
    current: false,
  },
  {
    label: '請款單',
    href: 'https://dong-sc.github.io/simple-payment-request-generator/',
    current: false,
  },
  {
    label: '服務範圍確認',
    href: 'https://dong-sc.github.io/simple-scope-confirmation-generator/',
    current: true,
  },
];

export function Header() {
  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">Simple Work Tools #3</p>
        <h1>服務範圍確認單製作工具</h1>
        <p className="intro">
          一個給自由工作者與小型工作室使用的服務範圍確認單製作工具。開始工作前，先把服務內容、交付項目、修改次數、不包含範圍與額外需求處理方式整理清楚，降低後續溝通誤會。
        </p>
        <nav className="header-tool-shortcuts" aria-label="其他接案文件工具">
          {shortcuts.map((shortcut) => (
            <a
              aria-current={shortcut.current ? 'page' : undefined}
              href={shortcut.href}
              key={shortcut.href}
            >
              {shortcut.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="header-notes">
        <p className="privacy-note">資料僅儲存在你的瀏覽器，不會上傳到任何伺服器。</p>
        <p className="legal-note">{legalDisclaimer}</p>
      </div>
    </header>
  );
}
