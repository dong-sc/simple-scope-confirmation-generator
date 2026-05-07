import type { ProviderInfo, ScopeConfirmationData } from '../types/scopeConfirmation';

interface ProviderSectionProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

export function ProviderSection({ data, onChange }: ProviderSectionProps) {
  function updateProvider(patch: Partial<ProviderInfo>) {
    onChange({ ...data, provider: { ...data.provider, ...patch } });
  }

  return (
    <section className="form-section">
      <h2>服務提供者資訊</h2>
      <div className="field-grid two-columns">
        <label>
          聯絡人 / 姓名
          <input
            value={data.provider.name}
            onChange={(event) => updateProvider({ name: event.target.value })}
            placeholder="可留空"
          />
        </label>
        <label>
          公司名稱
          <input
            value={data.provider.company}
            onChange={(event) => updateProvider({ company: event.target.value })}
            placeholder="可留空"
          />
        </label>
        <label>
          統編
          <input
            value={data.provider.taxId}
            onChange={(event) => updateProvider({ taxId: event.target.value })}
            placeholder="可留空"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={data.provider.email}
            onChange={(event) => updateProvider({ email: event.target.value })}
          />
        </label>
        <label>
          電話
          <input
            value={data.provider.phone}
            onChange={(event) => updateProvider({ phone: event.target.value })}
          />
        </label>
        <label>
          地址
          <input
            value={data.provider.address}
            onChange={(event) => updateProvider({ address: event.target.value })}
            placeholder="可留空"
          />
        </label>
        <label className="span-two">
          網站
          <input
            value={data.provider.website}
            onChange={(event) => updateProvider({ website: event.target.value })}
            placeholder="可留空"
          />
        </label>
      </div>
    </section>
  );
}
