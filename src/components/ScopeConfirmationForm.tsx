import { ClientMaterialsEditor } from './ClientMaterialsEditor';
import { ClientSection } from './ClientSection';
import { DeliverablesEditor } from './DeliverablesEditor';
import { ExcludedScopeEditor } from './ExcludedScopeEditor';
import { IncludedScopeEditor } from './IncludedScopeEditor';
import { NotesEditor } from './NotesEditor';
import { ProjectInfoSection } from './ProjectInfoSection';
import { ProviderSection } from './ProviderSection';
import { RevisionRulesEditor } from './RevisionRulesEditor';
import { TimelinePaymentEditor } from './TimelinePaymentEditor';
import type { ScopeConfirmationData } from '../types/scopeConfirmation';

interface ScopeConfirmationFormProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

export function ScopeConfirmationForm({
  data,
  onChange,
}: ScopeConfirmationFormProps) {
  function update<K extends keyof ScopeConfirmationData>(
    key: K,
    value: ScopeConfirmationData[K],
  ) {
    onChange({ ...data, [key]: value });
  }

  return (
    <form className="document-form">
      <section className="form-section">
        <h2>確認單資訊</h2>
        <div className="field-grid two-columns">
          <label>
            文件標題
            <input
              value={data.title}
              onChange={(event) => update('title', event.target.value)}
            />
          </label>
          <label>
            確認單編號
            <input
              value={data.confirmationNumber}
              onChange={(event) =>
                update('confirmationNumber', event.target.value)
              }
              placeholder="可留空"
            />
          </label>
          <label>
            確認日期
            <input
              type="date"
              value={data.issueDate}
              onChange={(event) => update('issueDate', event.target.value)}
            />
          </label>
          <label>
            對應報價單編號
            <input
              value={data.relatedQuoteNumber}
              onChange={(event) =>
                update('relatedQuoteNumber', event.target.value)
              }
              placeholder="可留空"
            />
          </label>
          <label>
            專案名稱
            <input
              value={data.projectName}
              onChange={(event) => update('projectName', event.target.value)}
            />
          </label>
          <label>
            專案類型
            <input
              value={data.projectType}
              onChange={(event) => update('projectType', event.target.value)}
              placeholder="可留空"
            />
          </label>
        </div>
      </section>

      <ProviderSection data={data} onChange={onChange} />
      <ClientSection data={data} onChange={onChange} />
      <ProjectInfoSection data={data} onChange={onChange} />
      <IncludedScopeEditor data={data} onChange={onChange} />
      <ExcludedScopeEditor data={data} onChange={onChange} />
      <DeliverablesEditor data={data} onChange={onChange} />
      <RevisionRulesEditor data={data} onChange={onChange} />
      <ClientMaterialsEditor data={data} onChange={onChange} />
      <TimelinePaymentEditor data={data} onChange={onChange} />
      <NotesEditor data={data} onChange={onChange} />
    </form>
  );
}
