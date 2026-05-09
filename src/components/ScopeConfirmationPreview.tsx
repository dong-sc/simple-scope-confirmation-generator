import type {
  ClientMaterialItem,
  DeliverableItem,
  ExcludedScopeItem,
  ScopeConfirmationData,
  ScopeItem,
} from '../types/scopeConfirmation';
import {
  isClientMaterialItemEmpty,
  isDeliverableItemEmpty,
  isExcludedScopeItemEmpty,
  isScopeItemEmpty,
} from '../utils/list';

interface ScopeConfirmationPreviewProps {
  data: ScopeConfirmationData;
}

function DetailLine({ label, value }: { label: string; value: string }) {
  if (!value.trim()) {
    return null;
  }

  return (
    <p>
      <span>{label}</span>
      {value}
    </p>
  );
}

function AlignedDetailLine({ label, value }: { label: string; value: string }) {
  return (
    <p className={value.trim() ? undefined : 'empty-detail'}>
      <span>{label}</span>
      {value.trim() || '\u00A0'}
    </p>
  );
}

function TextBlock({ title, value }: { title: string; value: string }) {
  if (!value.trim()) {
    return null;
  }

  return (
    <section className="preview-block">
      <h3>{title}</h3>
      <p className="multiline">{value}</p>
    </section>
  );
}

function IncludedScopeList({ items }: { items: ScopeItem[] }) {
  const visibleItems = items.filter((item) => !isScopeItemEmpty(item));
  if (!visibleItems.length) {
    return null;
  }

  return (
    <section className="preview-block">
      <h3>包含服務項目</h3>
      <ol className="preview-list">
        {visibleItems.map((item) => (
          <li key={item.id}>
            <strong>{item.name || '未命名項目'}</strong>
            <p>{item.description}</p>
            <small>
              {[item.quantity, item.note].filter((value) => value.trim()).join('｜')}
            </small>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ExcludedScopeList({ items }: { items: ExcludedScopeItem[] }) {
  const visibleItems = items.filter((item) => !isExcludedScopeItemEmpty(item));
  if (!visibleItems.length) {
    return null;
  }

  return (
    <section className="preview-block excluded-block">
      <h3>不包含服務項目</h3>
      <ol className="preview-list">
        {visibleItems.map((item) => (
          <li key={item.id}>
            <strong>{item.name || '未命名項目'}</strong>
            <p>{item.description}</p>
            <small>{item.note}</small>
          </li>
        ))}
      </ol>
    </section>
  );
}

function DeliverableList({ items }: { items: DeliverableItem[] }) {
  const visibleItems = items.filter((item) => !isDeliverableItemEmpty(item));
  if (!visibleItems.length) {
    return null;
  }

  return (
    <section className="preview-block">
      <h3>交付項目</h3>
      <div className="preview-table-wrap">
        <table className="preview-table">
          <thead>
            <tr>
              <th>交付名稱</th>
              <th>格式</th>
              <th>數量</th>
              <th>交付時間</th>
              <th>備註</th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name || '-'}</td>
                <td>{item.format || '-'}</td>
                <td>{item.quantity || '-'}</td>
                <td>{item.deliveryTime || '-'}</td>
                <td>{item.note || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ClientMaterialList({ items }: { items: ClientMaterialItem[] }) {
  const visibleItems = items.filter((item) => !isClientMaterialItemEmpty(item));
  if (!visibleItems.length) {
    return null;
  }

  return (
    <section className="preview-block">
      <h3>客戶需提供資料</h3>
      <ol className="preview-list">
        {visibleItems.map((item) => (
          <li key={item.id}>
            <strong>{item.name || '未命名資料'}</strong>
            <p>{item.description}</p>
            <small>
              {[item.dueDate, item.note].filter((value) => value.trim()).join('｜')}
            </small>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ScopeConfirmationPreview({
  data,
}: ScopeConfirmationPreviewProps) {
  return (
    <aside className="preview-pane" aria-label="服務範圍確認單預覽">
      <article className="scope-preview">
        <header className="preview-header">
          <div>
            <p className="preview-label">Scope Confirmation</p>
            <h2>{data.title || '服務範圍確認單'}</h2>
          </div>
          <div className="preview-meta">
            <DetailLine label="編號" value={data.confirmationNumber} />
            <DetailLine label="報價單" value={data.relatedQuoteNumber} />
            <DetailLine label="專案" value={data.projectName} />
            <DetailLine label="類型" value={data.projectType} />
            <DetailLine label="確認日" value={data.issueDate} />
            <DetailLine label="開始" value={data.timelinePaymentNote.startDate} />
            <DetailLine label="完成" value={data.timelinePaymentNote.endDate} />
          </div>
        </header>

        <section className="preview-party-grid">
          <div className="preview-party">
            <h3>服務提供者</h3>
            <div className="preview-logo-box">
              {data.provider.logoImage ? (
                <img src={data.provider.logoImage} alt="服務提供者 Logo" />
              ) : null}
            </div>
            <strong>{data.provider.company || data.provider.name || '服務提供者'}</strong>
            <AlignedDetailLine label="聯絡人" value={data.provider.name} />
            <AlignedDetailLine label="公司名稱" value={data.provider.company} />
            <AlignedDetailLine label="統編" value={data.provider.taxId} />
            <AlignedDetailLine label="Email" value={data.provider.email} />
            <AlignedDetailLine label="電話" value={data.provider.phone} />
            <AlignedDetailLine label="地址" value={data.provider.address} />
            <AlignedDetailLine label="網站" value={data.provider.website} />
          </div>
          <div className="preview-party">
            <h3>客戶</h3>
            <strong>{data.client.company || data.client.name || '客戶'}</strong>
            <AlignedDetailLine label="聯絡人" value={data.client.name} />
            <AlignedDetailLine label="公司名稱" value={data.client.company} />
            <AlignedDetailLine label="統編" value={data.client.taxId} />
            <AlignedDetailLine label="Email" value={data.client.email} />
            <AlignedDetailLine label="電話" value={data.client.phone} />
            <AlignedDetailLine label="地址" value={data.client.address} />
            <AlignedDetailLine label="網站" value={data.client.website} />
          </div>
        </section>

        <TextBlock title="專案背景" value={data.projectBackground} />
        <TextBlock title="專案目標" value={data.projectGoal} />
        <TextBlock title="本次合作重點" value={data.collaborationFocus} />
        <IncludedScopeList items={data.includedScopes} />
        <ExcludedScopeList items={data.excludedScopes} />
        <DeliverableList items={data.deliverables} />

        <section className="preview-block">
          <h3>修改與變更規則</h3>
          <p>包含修改次數：{data.revisionRules.includedRevisionCount || 0} 次</p>
          <p className="multiline">{data.revisionRules.revisionScope}</p>
          <p className="multiline">{data.revisionRules.extraRevisionPolicy}</p>
          <p className="multiline">{data.revisionRules.changeRequestPolicy}</p>
        </section>

        <ClientMaterialList items={data.clientMaterials} />

        <section className="preview-block">
          <h3>時程與付款提醒</h3>
          <DetailLine label="重要里程碑" value={data.timelinePaymentNote.milestones} />
          <p>
            <span>需先付款 / 訂金確認後開始</span>
            {data.timelinePaymentNote.requiresDepositBeforeStart ? '是' : '否'}
          </p>
          <p className="multiline">{data.timelinePaymentNote.paymentReminder}</p>
        </section>

        <TextBlock title="補充備註" value={data.notes} />
        <TextBlock title="確認文字" value={data.confirmationText} />
        <section className="preview-block legal-disclaimer">
          <h3>法律邊界提示</h3>
          <p>{data.legalDisclaimer}</p>
        </section>
      </article>
    </aside>
  );
}
