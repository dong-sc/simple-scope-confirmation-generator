import type {
  ClientMaterialItem,
  ScopeConfirmationData,
} from '../types/scopeConfirmation';
import { createEmptyClientMaterialItem } from '../utils/list';

interface ClientMaterialsEditorProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

export function ClientMaterialsEditor({
  data,
  onChange,
}: ClientMaterialsEditorProps) {
  function updateItem(id: string, patch: Partial<ClientMaterialItem>) {
    onChange({
      ...data,
      clientMaterials: data.clientMaterials.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  }

  function addItem() {
    onChange({
      ...data,
      clientMaterials: [...data.clientMaterials, createEmptyClientMaterialItem()],
    });
  }

  function removeItem(id: string) {
    const nextItems = data.clientMaterials.filter((item) => item.id !== id);
    onChange({
      ...data,
      clientMaterials: nextItems.length
        ? nextItems
        : [createEmptyClientMaterialItem()],
    });
  }

  return (
    <section className="form-section">
      <div className="section-title-row">
        <h2>客戶需提供資料</h2>
        <button className="button small" type="button" onClick={addItem}>
          新增客戶需提供資料
        </button>
      </div>
      <div className="items-editor">
        {data.clientMaterials.map((item, index) => (
          <article className="item-card" key={item.id}>
            <div className="item-card-header">
              <strong>資料 {index + 1}</strong>
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
                資料名稱
                <input
                  value={item.name}
                  onChange={(event) => updateItem(item.id, { name: event.target.value })}
                  placeholder="例如：Logo 檔案、文字內容、場地資訊"
                />
              </label>
              <label>
                提供期限
                <input
                  value={item.dueDate}
                  onChange={(event) =>
                    updateItem(item.id, { dueDate: event.target.value })
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
