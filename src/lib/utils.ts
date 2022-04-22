import memoize from 'lodash.memoize'
import type { Item } from './types'

export function flatten<I extends Item = Item>(items: I[]): I[] {
  if (items.length === 0) return []
  const children = items.reduce(
    (acc, item) => acc.concat(...item.children),
    [] as I[],
  )
  return [...items, ...flatten(children)]
}

const memoizedFlatten = memoize(flatten)

function checkForCycle<I extends Item = Item>(items: I[]) {
  const flatItems = memoizedFlatten(items)

  for (let index = 0; index < flatItems.length; index += 1) {
    const item = flatItems[index]
    if (item.parent) {
      const children = memoizedFlatten(item.children).map(i => i.id)
      if (item.id === item.parent || children.includes(item.parent)) {
        throw new Error(`Cycle parent/children found for item: ${item.id}`)
      }
    }
  }
}

export function composedPath<I extends Item = Item>(
  items: I[],
  id?: I['id'],
): Array<I['id']> {
  if (!id) return []
  const flatItems = memoizedFlatten(items)
  const item = flatItems.find(i => i.id === id)
  checkForCycle(items)
  if (!item) return []
  return [...composedPath(items, item.parent), id]
}

function getChildren<I extends Item = Item>(
  data: Omit<I, 'children'>[],
  item: I,
): I {
  const children = data
    .filter(i => i.parent === item.id)
    .map(i => getChildren(data, i as I))
  return { ...item, children }
}

export function toTree<I extends Item = Item>(
  data: Omit<I, 'children'>[],
): I[] {
  const root = data.filter(item => !item.parent)
  return root.map(item => getChildren(data, item as I))
}
