export type VisibilityFilter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE'

export const visibilityFilterTitles = [
  { key: 'SHOW_ALL', title: 'All' },
  { key: 'SHOW_ACTIVE', title: 'Active' },
  { key: 'SHOW_COMPLETED', title: 'Completed' }
] as const
