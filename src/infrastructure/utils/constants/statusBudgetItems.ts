export const StatusBudgetItems: { 
  [x: string]: 
  'SENT' | 
  'OPEN' | 
  'REFUSED' | 
  'ACCEPTED' 
} = {
  SENT: 'SENT',
  OPEN: 'OPEN',
  REFUSED: 'REFUSED',
  ACCEPTED: 'ACCEPTED'
}

export type StatusBudgetItems = typeof StatusBudgetItems[keyof typeof StatusBudgetItems]

export enum EnumStatusBudgetItems {
  SENT = 'SENT',
  OPEN = 'OPEN',
  REFUSED = 'REFUSED',
  ACCEPTED = 'ACCEPTED'
}