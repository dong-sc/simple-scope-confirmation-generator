import type { ScopeConfirmationData } from '../types/scopeConfirmation';
import {
  isClientMaterialItemEmpty,
  isDeliverableItemEmpty,
  isExcludedScopeItemEmpty,
  isScopeItemEmpty,
} from './list';

function optionalLine(label: string, value: string): string[] {
  return value.trim() ? [`${label}：${value.trim()}`] : [];
}

function listLines<T>(
  items: T[],
  isEmpty: (item: T) => boolean,
  render: (item: T, index: number) => string,
): string[] {
  const visibleItems = items.filter((item) => !isEmpty(item));
  if (!visibleItems.length) {
    return ['（未填寫）'];
  }

  return visibleItems.map(render);
}

export function generateScopeConfirmationPlainText(
  data: ScopeConfirmationData,
): string {
  return [
    data.title,
    ...optionalLine('確認單編號', data.confirmationNumber),
    ...optionalLine('對應報價單編號', data.relatedQuoteNumber),
    ...optionalLine('專案名稱', data.projectName),
    ...optionalLine('專案類型', data.projectType),
    `確認日期：${data.issueDate}`,
    ...optionalLine('預計開始日期', data.timelinePaymentNote.startDate),
    ...optionalLine('預計完成日期', data.timelinePaymentNote.endDate),
    '',
    '服務提供者',
    ...optionalLine('聯絡人', data.provider.name),
    ...optionalLine('公司名稱', data.provider.company),
    ...optionalLine('統編', data.provider.taxId),
    ...optionalLine('Email', data.provider.email),
    ...optionalLine('電話', data.provider.phone),
    ...optionalLine('地址', data.provider.address),
    ...optionalLine('網站', data.provider.website),
    '',
    '客戶',
    ...optionalLine('聯絡人', data.client.name),
    ...optionalLine('公司名稱', data.client.company),
    ...optionalLine('統編', data.client.taxId),
    ...optionalLine('Email', data.client.email),
    ...optionalLine('電話', data.client.phone),
    ...optionalLine('地址', data.client.address),
    ...optionalLine('網站', data.client.website),
    '',
    ...optionalLine('專案背景', data.projectBackground),
    ...optionalLine('專案目標', data.projectGoal),
    ...optionalLine('本次合作重點', data.collaborationFocus),
    '',
    '包含服務項目',
    ...listLines(data.includedScopes, isScopeItemEmpty, (item, index) => {
      const detail = [item.description, item.quantity, item.note]
        .filter((value) => value.trim())
        .join('；');
      return `${index + 1}. ${item.name || '未命名項目'}${detail ? `：${detail}` : ''}`;
    }),
    '',
    '不包含服務項目',
    ...listLines(data.excludedScopes, isExcludedScopeItemEmpty, (item, index) => {
      const detail = [item.description, item.note]
        .filter((value) => value.trim())
        .join('；');
      return `${index + 1}. ${item.name || '未命名項目'}${detail ? `：${detail}` : ''}`;
    }),
    '',
    '交付項目',
    ...listLines(data.deliverables, isDeliverableItemEmpty, (item, index) => {
      const detail = [item.format, item.quantity, item.deliveryTime, item.note]
        .filter((value) => value.trim())
        .join('；');
      return `${index + 1}. ${item.name || '未命名交付'}${detail ? `：${detail}` : ''}`;
    }),
    '',
    '修改與變更規則',
    `包含修改次數：${data.revisionRules.includedRevisionCount || 0} 次`,
    ...optionalLine('修改範圍說明', data.revisionRules.revisionScope),
    ...optionalLine('額外修改處理方式', data.revisionRules.extraRevisionPolicy),
    ...optionalLine('變更需求處理方式', data.revisionRules.changeRequestPolicy),
    '',
    '客戶需提供資料',
    ...listLines(data.clientMaterials, isClientMaterialItemEmpty, (item, index) => {
      const detail = [item.description, item.dueDate, item.note]
        .filter((value) => value.trim())
        .join('；');
      return `${index + 1}. ${item.name || '未命名資料'}${detail ? `：${detail}` : ''}`;
    }),
    '',
    '時程與付款提醒',
    ...optionalLine('重要里程碑', data.timelinePaymentNote.milestones),
    data.timelinePaymentNote.requiresDepositBeforeStart
      ? '需先付款 / 訂金確認後開始：是'
      : '需先付款 / 訂金確認後開始：否',
    ...optionalLine('付款提醒', data.timelinePaymentNote.paymentReminder),
    '',
    ...optionalLine('補充備註', data.notes),
    ...optionalLine('確認文字', data.confirmationText),
    '',
    `法律邊界提示：${data.legalDisclaimer}`,
  ]
    .filter((line, index, lines) => !(line === '' && lines[index - 1] === ''))
    .join('\n');
}
