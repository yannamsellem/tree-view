import React, { useRef } from 'react'
import Accordion from './Accordion'
import type { Item } from './types'
import { ExpandContext } from './ExpandContext'

interface Props<I extends Item> {
  expandedItems?: I['id'][]
  items: I[]
  onChange?: (itemComposedPath: I['id'][], item: I) => void
  ItemComponent: React.ComponentType<{ item: I; expanded: boolean }>
}

export default function TreeView<I extends Item>({
  expandedItems = [],
  items,
  onChange,
  ItemComponent,
}: Props<I>) {
  const onChangeRef = useRef(onChange)
  if (onChangeRef.current !== onChange) {
    onChangeRef.current = onChange
  }

  return (
    <ExpandContext.Provider value={expandedItems}>
      {items.map(item => {
        return (
          <Accordion
            key={item.id}
            item={item}
            items={items}
            onChangeRef={onChangeRef}
            ItemComponent={ItemComponent}
          />
        )
      })}
    </ExpandContext.Provider>
  )
}

TreeView.defaultProps = {
  expandedItems: [],
  onChange: null,
}
