export type NumericInputValue = number | '';

export interface ScopeItem {
  id: string;
  name: string;
  description: string;
  quantity: string;
  note: string;
}

export interface ExcludedScopeItem {
  id: string;
  name: string;
  description: string;
  note: string;
}

export interface DeliverableItem {
  id: string;
  name: string;
  format: string;
  quantity: string;
  deliveryTime: string;
  note: string;
}

export interface ClientMaterialItem {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  note: string;
}

export interface ProviderInfo {
  name: string;
  company: string;
  taxId: string;
  email: string;
  phone: string;
  address: string;
  website: string;
}

export interface ClientInfo {
  name: string;
  company: string;
  taxId: string;
  email: string;
  phone: string;
  address: string;
  website: string;
}

export interface RevisionRules {
  includedRevisionCount: NumericInputValue;
  revisionScope: string;
  extraRevisionPolicy: string;
  changeRequestPolicy: string;
}

export interface TimelinePaymentNote {
  startDate: string;
  endDate: string;
  milestones: string;
  requiresDepositBeforeStart: boolean;
  paymentReminder: string;
}

export interface ScopeConfirmationData {
  title: string;
  confirmationNumber: string;
  issueDate: string;
  relatedQuoteNumber: string;
  projectName: string;
  projectType: string;
  provider: ProviderInfo;
  client: ClientInfo;
  projectBackground: string;
  projectGoal: string;
  collaborationFocus: string;
  includedScopes: ScopeItem[];
  excludedScopes: ExcludedScopeItem[];
  deliverables: DeliverableItem[];
  revisionRules: RevisionRules;
  clientMaterials: ClientMaterialItem[];
  timelinePaymentNote: TimelinePaymentNote;
  notes: string;
  confirmationText: string;
  legalDisclaimer: string;
}
