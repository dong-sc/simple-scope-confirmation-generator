import type {
  ScopeConfirmationData,
  TimelinePaymentNote,
} from '../types/scopeConfirmation';

interface TimelinePaymentEditorProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

export function TimelinePaymentEditor({
  data,
  onChange,
}: TimelinePaymentEditorProps) {
  function updateTimeline(patch: Partial<TimelinePaymentNote>) {
    onChange({
      ...data,
      timelinePaymentNote: { ...data.timelinePaymentNote, ...patch },
    });
  }

  return (
    <section className="form-section">
      <h2>時程與付款提醒</h2>
      <div className="field-grid two-columns">
        <label>
          預計開始日期
          <input
            type="date"
            value={data.timelinePaymentNote.startDate}
            onChange={(event) => updateTimeline({ startDate: event.target.value })}
          />
        </label>
        <label>
          預計完成日期
          <input
            type="date"
            value={data.timelinePaymentNote.endDate}
            onChange={(event) => updateTimeline({ endDate: event.target.value })}
          />
        </label>
        <label className="span-two">
          重要里程碑
          <textarea
            rows={3}
            value={data.timelinePaymentNote.milestones}
            onChange={(event) => updateTimeline({ milestones: event.target.value })}
            placeholder="可留空"
          />
        </label>
        <label className="checkbox-field span-two">
          <input
            type="checkbox"
            checked={data.timelinePaymentNote.requiresDepositBeforeStart}
            onChange={(event) =>
              updateTimeline({
                requiresDepositBeforeStart: event.target.checked,
              })
            }
          />
          需先付款 / 訂金確認後開始
        </label>
        <label className="span-two">
          付款提醒文字
          <textarea
            rows={3}
            value={data.timelinePaymentNote.paymentReminder}
            onChange={(event) =>
              updateTimeline({ paymentReminder: event.target.value })
            }
          />
        </label>
      </div>
    </section>
  );
}
