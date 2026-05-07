import { useEffect, useState } from 'react';
import { ActionBar } from './components/ActionBar';
import { Header } from './components/Header';
import { ScopeConfirmationForm } from './components/ScopeConfirmationForm';
import { ScopeConfirmationPreview } from './components/ScopeConfirmationPreview';
import { SupportSection } from './components/SupportSection';
import type { ScopeConfirmationData } from './types/scopeConfirmation';
import {
  clearScopeConfirmationData,
  loadScopeConfirmationData,
  saveScopeConfirmationData,
} from './utils/storage';
import { generateScopeConfirmationPlainText } from './utils/scopeText';

function getPrintableTitle(title: string): string {
  const normalizedTitle = title.trim() || '服務範圍確認單';
  const safeTitle = normalizedTitle.replace(/[\\/:*?"<>|]/g, '-');

  return `${safeTitle}_服務範圍確認單`;
}

function ToolShortcuts() {
  return (
    <nav className="tool-shortcuts" aria-label="接案文件工具切換">
      <p>其他小工具</p>
      <div>
        <a href="https://dong-sc.github.io/simple-quote-generator/">
          報價單
        </a>
        <a href="https://dong-sc.github.io/simple-payment-request-generator/">
          請款單
        </a>
        <a aria-current="page" href="https://dong-sc.github.io/simple-scope-confirmation-generator/">
          範圍確認
        </a>
      </div>
    </nav>
  );
}

export default function App() {
  const [scopeData, setScopeData] = useState<ScopeConfirmationData>(() =>
    loadScopeConfirmationData(),
  );
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    saveScopeConfirmationData(scopeData);
  }, [scopeData]);

  function handleClear() {
    setScopeData(clearScopeConfirmationData());
    setCopyMessage('');
  }

  async function handleCopyText() {
    await navigator.clipboard.writeText(generateScopeConfirmationPlainText(scopeData));
    setCopyMessage('已複製文字版確認內容');
    window.setTimeout(() => setCopyMessage(''), 2200);
  }

  function handlePrint() {
    const originalTitle = document.title;
    document.title = getPrintableTitle(scopeData.title);

    const restoreTitle = () => {
      document.title = originalTitle;
      window.removeEventListener('afterprint', restoreTitle);
    };

    window.addEventListener('afterprint', restoreTitle);
    window.print();
    window.setTimeout(restoreTitle, 1000);
  }

  return (
    <>
      <Header />
      <main className="app-shell">
        <ToolShortcuts />
        <section className="workspace" aria-label="服務範圍確認單製作工作區">
          <div className="form-pane">
            <ActionBar
              copyMessage={copyMessage}
              onClear={handleClear}
              onCopyText={handleCopyText}
              onPrint={handlePrint}
            />
            <ScopeConfirmationForm data={scopeData} onChange={setScopeData} />
          </div>
          <ScopeConfirmationPreview data={scopeData} />
        </section>
        <SupportSection />
      </main>
    </>
  );
}
