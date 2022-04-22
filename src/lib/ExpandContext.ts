import { createContext, useContextSelector } from 'use-context-selector'

export const ExpandContext = createContext<string[]>([])
ExpandContext.displayName = 'ExpandContext'

export function useIsExpanded(id: string) {
  return useContextSelector(ExpandContext, items => items.includes(id))
}
