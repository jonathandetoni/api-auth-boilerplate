export const StatusBudgets: { 
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

export type StatusBudgets = typeof StatusBudgets[keyof typeof StatusBudgets]