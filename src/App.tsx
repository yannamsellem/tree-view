import { useState } from 'react'
import AccordionItem from './AccordionItem'
import TreeView, { toTree } from './lib'

const dataItems: Array<{ id: string; parent?: string }> = [
  { id: '1' },
  { id: '1.1', parent: '1' },
  { id: '1.1.1', parent: '1.1' },
  { id: '1.1.2', parent: '1.1' },
  { id: '1.1.3', parent: '1.1' },
  { id: '1.1.4', parent: '1.1' },
  { id: '1.2', parent: '1' },
  { id: '2' },
  { id: '2.1', parent: '2' },
  { id: '2.2', parent: '2' },
  { id: '2.3', parent: '2' },
  { id: '2.4', parent: '2' },
  { id: '2.4.1', parent: '2.4' },
  { id: '2.4.1.1', parent: '2.4.1' },
  { id: '2.4.1.1.1', parent: '2.4.1.1' },
]

const items = toTree(dataItems)

function App() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  return (
    <TreeView
      items={items}
      renderItem={(item, expanded) => (
        <AccordionItem item={item} expanded={expanded} />
      )}
      expandedItems={expandedItems}
      onChange={(next, item) => {
        const willExpand = next.includes(item.id)
        const nextExpanded = Array.from(new Set([...next, ...expandedItems]))
        setExpandedItems(
          willExpand ? nextExpanded : nextExpanded.filter(id => id !== item.id),
        )
      }}
    />
  )
}

export default App
