import type { ClientInfo, ScopeConfirmationData } from '../types/scopeConfirmation';
import { CollapsibleFieldGroup } from './CollapsibleFieldGroup';

interface ClientSectionProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

export function ClientSection({ data, onChange }: ClientSectionProps) {
  function updateClient(patch: Partial<ClientInfo>) {
    onChange({ ...data, client: { ...data.client, ...patch } });
  }

  return (
    <section className="form-section">
      <h2>客戶資訊</h2>
      <div className="field-grid two-columns">
        <label>
          聯絡人 / 姓名
          <input
            value={data.client.name}
            onChange={(event) => updateClient({ name: event.target.value })}
            placeholder="可留空"
          />
        </label>
        <label>
          公司名稱
          <input
            value={data.client.company}
            onChange={(event) => updateClient({ company: event.target.value })}
            placeholder="可留空"
          />
        </label>
        <label>
          統編
          <input
            value={data.client.taxId}
            onChange={(event) => updateClient({ taxId: event.target.value })}
            placeholder="可留空"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={data.client.email}
            onChange={(event) => updateClient({ email: event.target.value })}
            placeholder="可留空"
          />
        </label>
        <label>
          電話
          <input
            value={data.client.phone}
            onChange={(event) => updateClient({ phone: event.target.value })}
            placeholder="可留空"
          />
        </label>
        <CollapsibleFieldGroup title="地址、網站">
          <div className="field-grid two-columns nested-field-grid">
            <label className="span-two">
              地址
              <input
                value={data.client.address}
                onChange={(event) => updateClient({ address: event.target.value })}
                placeholder="可留空"
              />
            </label>
            <label className="span-two">
              網站
              <input
                value={data.client.website}
                onChange={(event) => updateClient({ website: event.target.value })}
                placeholder="可留空"
              />
            </label>
          </div>
        </CollapsibleFieldGroup>
      </div>
    </section>
  );
}
