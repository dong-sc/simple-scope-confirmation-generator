import type {
  ExcludedScopeItem,
  ScopeConfirmationData,
} from '../types/scopeConfirmation';
import { createEmptyExcludedScopeItem } from '../utils/list';

interface ExcludedScopeEditorProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

const examples = [
  '未列明之額外設計',
  '額外場次或額外時數',
  '原始檔交付',
  '第三方授權費用',
  '額外修圖 / 額外剪輯',
  '廣告投放費用',
  '交通、住宿或材料代墊費',
  '未列於確認單中的其他服務',
];

export function ExcludedScopeEditor({ data, onChange }: ExcludedScopeEditorProps) {
  function updateItem(id: string, patch: Partial<ExcludedScopeItem>) {
    onChange({
      ...data,
      excludedScopes: data.excludedScopes.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  }

  function addItem(name = '') {
    onChange({
      ...data,
      excludedScopes: [
        ...data.excludedScopes,
        { ...createEmptyExcludedScopeItem(), name },
      ],
    });
  }

  function removeItem(id: string) {
    const nextItems = data.excludedScopes.filter((item) => item.id !== id);
    onChange({
      ...data,
      excludedScopes: nextItems.length ? nextItems : [createEmptyExcludedScopeItem()],
    });
  }

  return (
    <section className="form-section">
      <div className="section-title-row">
        <h2>不包含服務項目</h2>
        <button className="button small" type="button" onClick={() => addItem()}>
          新增不包含服務項目
        </button>
      </div>
      <p className="section-hint">
        列出本次合作不包含的內容，可以降低後續誤會與額外工作爭議。
      </p>
      <div className="template-buttons">
        {examples.map((example) => (
          <button
            className="chip-button"
            type="button"
            key={example}
            onClick={() => addItem(example)}
          >
            {example}
          </button>
        ))}
      </div>
      <div className="items-editor">
        {data.excludedScopes.map((item, index) => (
          <article className="item-card" key={item.id}>
            <div className="item-card-header">
              <strong>不包含項目 {index + 1}</strong>
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
                />
              </label>
              <label>
                備註
                <input
                  value={item.note}
                  onChange={(event) => updateItem(item.id, { note: event.target.value })}
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
                />
              </label>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
