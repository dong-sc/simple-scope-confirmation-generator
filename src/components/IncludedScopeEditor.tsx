import type { ScopeConfirmationData, ScopeItem } from '../types/scopeConfirmation';
import { createEmptyScopeItem } from '../utils/list';

interface IncludedScopeEditorProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

export function IncludedScopeEditor({ data, onChange }: IncludedScopeEditorProps) {
  function updateItem(id: string, patch: Partial<ScopeItem>) {
    onChange({
      ...data,
      includedScopes: data.includedScopes.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  }

  function addItem() {
    onChange({
      ...data,
      includedScopes: [...data.includedScopes, createEmptyScopeItem()],
    });
  }

  function removeItem(id: string) {
    const nextItems = data.includedScopes.filter((item) => item.id !== id);
    onChange({
      ...data,
      includedScopes: nextItems.length ? nextItems : [createEmptyScopeItem()],
    });
  }

  return (
    <section className="form-section">
      <div className="section-title-row">
        <h2>包含服務項目</h2>
        <button className="button small" type="button" onClick={addItem}>
          新增包含服務項目
        </button>
      </div>
      <div className="items-editor">
        {data.includedScopes.map((item, index) => (
          <article className="item-card" key={item.id}>
            <div className="item-card-header">
              <strong>包含項目 {index + 1}</strong>
              <button
                className="text-button danger"
                type="button"
                onClick={() => removeItem(item.id)}
              >
                刪除
              </button>
            </div>
            <div className="field-grid two-columns">
              <label>
                項目名稱
                <input
                  value={item.name}
                  onChange={(event) => updateItem(item.id, { name: event.target.value })}
                  placeholder="例如：主視覺設計、活動攝影、網站首頁製作"
                />
              </label>
              <label>
                數量 / 次數
                <input
                  value={item.quantity}
                  onChange={(event) =>
                    updateItem(item.id, { quantity: event.target.value })
                  }
                  placeholder="可留空"
                />
              </label>
              <label className="span-two">
                說明
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(event) =>
                    updateItem(item.id, { description: event.target.value })
                  }
                  placeholder="簡短說明該項目包含的工作內容。"
                />
              </label>
              <label className="span-two">
                備註
                <input
                  value={item.note}
                  onChange={(event) => updateItem(item.id, { note: event.target.value })}
                  placeholder="可留空"
                />
              </label>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
