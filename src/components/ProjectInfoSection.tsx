import type { ScopeConfirmationData } from '../types/scopeConfirmation';

interface ProjectInfoSectionProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

export function ProjectInfoSection({ data, onChange }: ProjectInfoSectionProps) {
  function update<K extends keyof ScopeConfirmationData>(
    key: K,
    value: ScopeConfirmationData[K],
  ) {
    onChange({ ...data, [key]: value });
  }

  return (
    <section className="form-section">
      <h2>專案目標</h2>
      <div className="stacked-fields">
        <label>
          專案背景
          <textarea
            rows={3}
            value={data.projectBackground}
            onChange={(event) => update('projectBackground', event.target.value)}
            placeholder="可留空"
          />
        </label>
        <label>
          專案目標
          <textarea
            rows={3}
            value={data.projectGoal}
            onChange={(event) => update('projectGoal', event.target.value)}
            placeholder="例如：完成品牌活動影像紀錄、建立官方網站首頁、製作一支 60 秒宣傳影片、完成課程簡報設計等。"
          />
        </label>
        <label>
          本次合作重點
          <textarea
            rows={3}
            value={data.collaborationFocus}
            onChange={(event) => update('collaborationFocus', event.target.value)}
            placeholder="例如：準時交付、清楚溝通修改範圍、依確認內容完成指定項目。"
          />
        </label>
      </div>
    </section>
  );
}
