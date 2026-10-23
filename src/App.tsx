import { useEffect, useState } from 'react';
import { ActionBar } from './components/ActionBar';
import { AuthorPromoSection } from './components/AuthorPromoSection';
import { DongToolsBar } from './components/DongToolsBar';
import { Header } from './components/Header';
import { ScopeConfirmationForm } from './components/ScopeConfirmationForm';
import { ScopeConfirmationPreview } from './components/ScopeConfirmationPreview';
import { SupportSection } from './components/SupportSection';
import { VisitorCounter } from './components/VisitorCounter';
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

export default function App() {
  const [scopeData, setScopeData] = useState<ScopeConfirmationData>(() =>
    loadScopeConfirmationData(),
  );
  const [copyMessage, setCopyMessage] = useState('');
  const [draftSaved, setDraftSaved] = useState(true);

  useEffect(() => {
    document.getElementById('root')?.removeAttribute('inert');
  }, []);

  useEffect(() => {
    setDraftSaved(saveScopeConfirmationData(scopeData));
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
      <DongToolsBar />
      <Header />
      <main className="app-shell">
        <section className="workspace" aria-label="服務範圍確認單製作工作區">
          <div className="form-pane">
            {!draftSaved && (
              <p role="alert">
                草稿未能讀取或儲存，原有儲存內容會保留。目前仍可編輯與匯出，但關閉頁面後本次變更可能遺失；請先匯出或列印。若要捨棄原草稿並重新儲存，請按「清空表單」。
              </p>
            )}
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
        <AuthorPromoSection />
        <VisitorCounter />
      </main>
    </>
  );
}
