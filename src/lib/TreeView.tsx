import React from 'react'
import Accordion from './Accordion'
import type { Item } from './types'

interface Props<I extends Item> {
  expandedItems?: I['id'][]
  items: I[]
  onChange?: (itemComposedPath: I['id'][], item: I) => void
  renderItem?: (item: I, expanded: boolean) => React.ReactNode
}

export default function TreeView<I extends Item>({
  expandedItems,
  items,
  onChange,
  renderItem,
}: Props<I>) {
  return (
    <>
      {items.map(item => {
        return (
          <Accordion
            key={item.id}
            expandedItems={expandedItems}
            item={item}
            items={items}
            onChange={onChange}
            renderItem={renderItem}
          />
        )
      })}
    </>
  )
}

TreeView.defaultProps = {
  expandedItems: [],
  onChange: null,
  renderItem: null,
}
