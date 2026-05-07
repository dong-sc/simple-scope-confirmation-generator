import type {
  ClientMaterialItem,
  DeliverableItem,
  ExcludedScopeItem,
  ScopeItem,
} from '../types/scopeConfirmation';

export function createEmptyScopeItem(): ScopeItem {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    quantity: '',
    note: '',
  };
}

export function createEmptyExcludedScopeItem(): ExcludedScopeItem {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    note: '',
  };
}

export function createEmptyDeliverableItem(): DeliverableItem {
  return {
    id: crypto.randomUUID(),
    name: '',
    format: '',
    quantity: '',
    deliveryTime: '',
    note: '',
  };
}

export function createEmptyClientMaterialItem(): ClientMaterialItem {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    dueDate: '',
    note: '',
  };
}

function allEmpty(values: string[]): boolean {
  return values.every((value) => !value.trim());
}

export function isScopeItemEmpty(item: ScopeItem): boolean {
  return allEmpty([item.name, item.description, item.quantity, item.note]);
}

export function isExcludedScopeItemEmpty(item: ExcludedScopeItem): boolean {
  return allEmpty([item.name, item.description, item.note]);
}

export function isDeliverableItemEmpty(item: DeliverableItem): boolean {
  return allEmpty([
    item.name,
    item.format,
    item.quantity,
    item.deliveryTime,
    item.note,
  ]);
}

export function isClientMaterialItemEmpty(item: ClientMaterialItem): boolean {
  return allEmpty([item.name, item.description, item.dueDate, item.note]);
}
