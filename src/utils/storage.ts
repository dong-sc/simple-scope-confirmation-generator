import type { ScopeConfirmationData } from '../types/scopeConfirmation';
import { createDefaultScopeConfirmationData } from './defaultScopeConfirmation';

const storageKey = 'simple-scope-confirmation-generator.scope-data';

function normalizeScopeConfirmationData(value: unknown): ScopeConfirmationData {
  const fallback = createDefaultScopeConfirmationData();

  if (!value || typeof value !== 'object') {
    return fallback;
  }

  const data = value as Partial<ScopeConfirmationData>;

  return {
    ...fallback,
    ...data,
    provider: { ...fallback.provider, ...data.provider },
    client: { ...fallback.client, ...data.client },
    revisionRules: { ...fallback.revisionRules, ...data.revisionRules },
    timelinePaymentNote: {
      ...fallback.timelinePaymentNote,
      ...data.timelinePaymentNote,
    },
    includedScopes:
      Array.isArray(data.includedScopes) && data.includedScopes.length > 0
        ? data.includedScopes
        : fallback.includedScopes,
    excludedScopes:
      Array.isArray(data.excludedScopes) && data.excludedScopes.length > 0
        ? data.excludedScopes
        : fallback.excludedScopes,
    deliverables:
      Array.isArray(data.deliverables) && data.deliverables.length > 0
        ? data.deliverables
        : fallback.deliverables,
    clientMaterials:
      Array.isArray(data.clientMaterials) && data.clientMaterials.length > 0
        ? data.clientMaterials
        : fallback.clientMaterials,
  };
}

export function loadScopeConfirmationData(): ScopeConfirmationData {
  try {
    const storedValue = localStorage.getItem(storageKey);
    if (!storedValue) {
      return createDefaultScopeConfirmationData();
    }

    return normalizeScopeConfirmationData(JSON.parse(storedValue));
  } catch {
    return createDefaultScopeConfirmationData();
  }
}

export function saveScopeConfirmationData(data: ScopeConfirmationData): void {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export function clearScopeConfirmationData(): ScopeConfirmationData {
  localStorage.removeItem(storageKey);
  return createDefaultScopeConfirmationData();
}
