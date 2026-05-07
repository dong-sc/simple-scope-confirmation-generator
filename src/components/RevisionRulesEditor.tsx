import type {
  RevisionRules,
  ScopeConfirmationData,
} from '../types/scopeConfirmation';

interface RevisionRulesEditorProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

export function RevisionRulesEditor({
  data,
  onChange,
}: RevisionRulesEditorProps) {
  function updateRules(patch: Partial<RevisionRules>) {
    onChange({
      ...data,
      revisionRules: { ...data.revisionRules, ...patch },
    });
  }

  return (
    <section className="form-section">
      <h2>修改與變更規則</h2>
      <div className="stacked-fields">
        <label>
          包含修改次數
          <input
            min="0"
            type="number"
            value={data.revisionRules.includedRevisionCount}
            onChange={(event) =>
              updateRules({
                includedRevisionCount: Math.max(0, Number(event.target.value) || 0),
              })
            }
          />
        </label>
        <label>
          修改範圍說明
          <textarea
            rows={3}
            value={data.revisionRules.revisionScope}
            onChange={(event) => updateRules({ revisionScope: event.target.value })}
          />
        </label>
        <label>
          額外修改處理方式
          <textarea
            rows={3}
            value={data.revisionRules.extraRevisionPolicy}
            onChange={(event) =>
              updateRules({ extraRevisionPolicy: event.target.value })
            }
          />
        </label>
        <label>
          變更需求處理方式
          <textarea
            rows={3}
            value={data.revisionRules.changeRequestPolicy}
            onChange={(event) =>
              updateRules({ changeRequestPolicy: event.target.value })
            }
          />
        </label>
      </div>
    </section>
  );
}
