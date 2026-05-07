import type { ScopeConfirmationData } from '../types/scopeConfirmation';
import { confirmationTemplates } from '../utils/defaultScopeConfirmation';

interface NotesEditorProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

export function NotesEditor({ data, onChange }: NotesEditorProps) {
  function update<K extends keyof ScopeConfirmationData>(
    key: K,
    value: ScopeConfirmationData[K],
  ) {
    onChange({ ...data, [key]: value });
  }

  function appendTemplate(template: string) {
    const nextText = data.confirmationText.trim()
      ? `${data.confirmationText.trim()}\n${template}`
      : template;
    update('confirmationText', nextText);
  }

  return (
    <section className="form-section">
      <h2>備註與確認文字</h2>
      <div className="stacked-fields">
        <label>
          補充備註
          <textarea
            rows={3}
            value={data.notes}
            onChange={(event) => update('notes', event.target.value)}
          />
        </label>
        <div>
          <p className="template-label">預設文字範本</p>
          <div className="template-buttons">
            {confirmationTemplates.map((template) => (
              <button
                className="chip-button"
                type="button"
                key={template}
                onClick={() => appendTemplate(template)}
              >
                {template}
              </button>
            ))}
          </div>
        </div>
        <label>
          確認文字
          <textarea
            rows={6}
            value={data.confirmationText}
            onChange={(event) => update('confirmationText', event.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
