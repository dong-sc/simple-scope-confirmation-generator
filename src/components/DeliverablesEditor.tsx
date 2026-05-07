import type {
  DeliverableItem,
  ScopeConfirmationData,
} from '../types/scopeConfirmation';
import { createEmptyDeliverableItem } from '../utils/list';

interface DeliverablesEditorProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

export function DeliverablesEditor({ data, onChange }: DeliverablesEditorProps) {
  function updateItem(id: string, patch: Partial<DeliverableItem>) {
    onChange({
      ...data,
      deliverables: data.deliverables.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  }

  function addItem() {
    onChange({
      ...data,
      deliverables: [...data.deliverables, createEmptyDeliverableItem()],
    });
  }

  function removeItem(id: string) {
    const nextItems = data.deliverables.filter((item) => item.id !== id);
    onChange({
      ...data,
      deliverables: nextItems.length ? nextItems : [createEmptyDeliverableItem()],
    });
  }

  return (
    <section className="form-section">
      <div className="section-title-row">
        <h2>交付項目</h2>
        <button className="button small" type="button" onClick={addItem}>
          新增交付項目
        </button>
      </div>
      <div className="items-editor">
        {data.deliverables.map((item, index) => (
          <article className="item-card" key={item.id}>
            <div className="item-card-header">
              <strong>交付項目 {index + 1}</strong>
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
                交付名稱
                <input
                  value={item.name}
                  onChange={(event) => updateItem(item.id, { name: event.target.value })}
                  placeholder="例如：完稿 PDF、MP4 影片、網站頁面"
                />
              </label>
              <label>
                交付格式
                <input
                  value={item.format}
                  onChange={(event) => updateItem(item.id, { format: event.target.value })}
                  placeholder="例如：PDF、JPG、MP4"
                />
              </label>
              <label>
                數量
                <input
                  value={item.quantity}
                  onChange={(event) =>
                    updateItem(item.id, { quantity: event.target.value })
                  }
                  placeholder="可留空"
                />
              </label>
              <label>
                交付時間
                <input
                  value={item.deliveryTime}
                  onChange={(event) =>
                    updateItem(item.id, { deliveryTime: event.target.value })
                  }
                  placeholder="可留空"
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
