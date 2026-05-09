import type { ProviderInfo, ScopeConfirmationData } from '../types/scopeConfirmation';

interface ProviderSectionProps {
  data: ScopeConfirmationData;
  onChange: (data: ScopeConfirmationData) => void;
}

const logoImageMaxWidth = 720;
const logoImageMaxHeight = 360;

function resizeLogoImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(
          1,
          logoImageMaxWidth / image.width,
          logoImageMaxHeight / image.height,
        );
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));

        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('Canvas is not supported.'));
          return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/png'));
      };
      image.onerror = () => reject(new Error('Unable to load image.'));
      image.src = String(reader.result || '');
    };

    reader.onerror = () => reject(new Error('Unable to read file.'));
    reader.readAsDataURL(file);
  });
}

export function ProviderSection({ data, onChange }: ProviderSectionProps) {
  function updateProvider(patch: Partial<ProviderInfo>) {
    onChange({ ...data, provider: { ...data.provider, ...patch } });
  }

  async function handleLogoUpload(file: File | null) {
    if (!file) {
      return;
    }

    try {
      updateProvider({ logoImage: await resizeLogoImage(file) });
    } catch {
      updateProvider({ logoImage: '' });
    }
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
        <div className="image-upload-card span-two">
          <label>
            服務提供者 Logo
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) =>
                void handleLogoUpload(event.currentTarget.files?.[0] ?? null)
              }
            />
          </label>
          <p className="upload-note">建議使用橫式或透明背景 Logo，系統會限制在預覽格內。</p>
          <div className="logo-upload-preview" aria-label="服務提供者 Logo 預覽">
            {data.provider.logoImage ? (
              <img src={data.provider.logoImage} alt="服務提供者 Logo" />
            ) : (
              <span>尚未上傳</span>
            )}
          </div>
          <button
            className="text-button danger"
            type="button"
            disabled={!data.provider.logoImage}
            onClick={() => updateProvider({ logoImage: '' })}
          >
            移除 Logo
          </button>
        </div>
      </div>
    </section>
  );
}
