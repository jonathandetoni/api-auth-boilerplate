export const TypeUser: { 
  [x: string]: 
  'USER' | 
  'COMMON' | 
  'PROFESSIONAL' | 
  'ADMINISTRATOR' 
} = {
  USER: 'USER',
  COMMON: 'COMMON',
  PROFESSIONAL: 'PROFESSIONAL',
  ADMINISTRATOR: 'ADMINISTRATOR'
}

export type TypeUser = typeof TypeUser[keyof typeof TypeUser]