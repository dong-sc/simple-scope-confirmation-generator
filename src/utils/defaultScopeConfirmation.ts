import type { ScopeConfirmationData } from '../types/scopeConfirmation';
import { getTodayString } from './date';
import {
  createEmptyClientMaterialItem,
  createEmptyDeliverableItem,
  createEmptyExcludedScopeItem,
  createEmptyScopeItem,
} from './list';

export const legalDisclaimer =
  '本工具產生的內容僅供雙方溝通與專案範圍確認使用，不構成法律合約或法律建議。';

export const confirmationTemplates = [
  '本確認單用於整理本次合作之服務範圍與交付內容，作為雙方溝通參考。',
  '若後續有新增需求，將依實際內容另行討論時程與費用。',
  '未列於本確認單之服務或交付項目，原則上不包含於本次合作範圍內。',
  '客戶需於約定時間內提供必要資料，以利專案順利進行。',
  '本工具產生之內容僅供溝通確認使用，不構成法律合約或法律建議。',
];

export function createDefaultScopeConfirmationData(): ScopeConfirmationData {
  return {
    title: '服務範圍確認單',
    confirmationNumber: '',
    issueDate: getTodayString(),
    relatedQuoteNumber: '',
    projectName: '',
    projectType: '',
    provider: {
      name: '',
      company: '',
      taxId: '',
      email: '',
      phone: '',
      address: '',
      website: '',
    },
    client: {
      name: '',
      company: '',
      taxId: '',
      email: '',
      phone: '',
      address: '',
      website: '',
    },
    projectBackground: '',
    projectGoal: '',
    collaborationFocus: '',
    includedScopes: [createEmptyScopeItem()],
    excludedScopes: [createEmptyExcludedScopeItem()],
    deliverables: [createEmptyDeliverableItem()],
    revisionRules: {
      includedRevisionCount: 1,
      revisionScope:
        '本次合作包含上述服務範圍內之合理修改，修改內容以原確認方向之調整為主。',
      extraRevisionPolicy:
        '超出原確認範圍之新增需求、方向重做或額外版本，將另行討論時程與費用。',
      changeRequestPolicy:
        '若專案內容、時程或交付項目有重大變更，雙方應重新確認服務範圍與交付安排。',
    },
    clientMaterials: [createEmptyClientMaterialItem()],
    timelinePaymentNote: {
      startDate: '',
      endDate: '',
      milestones: '',
      requiresDepositBeforeStart: false,
      paymentReminder: '若本專案需預付款或訂金，將於款項確認後開始安排執行。',
    },
    notes: '',
    confirmationText: '',
    legalDisclaimer,
  };
}
