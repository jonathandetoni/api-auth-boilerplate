export const StatusDemands: { 
  [x: string]: 
  'NEW' | 
  'OPEN_BUDGETS' | 
  'RECEIVED_BUDGETS' | 
  'CHOSEN_BUDGETS' |
  'FINISHED'
} = {
  NEW: 'NEW',
  OPEN_BUDGETS: 'OPEN_BUDGETS',
  RECEIVED_BUDGETS: 'RECEIVED_BUDGETS',
  CHOSEN_BUDGETS: 'CHOSEN_BUDGETS',
  FINISHED: 'FINISHED',
}

export type StatusDemands = typeof StatusDemands[keyof typeof StatusDemands]