import React, { useState } from 'react'
import AccordionItem from './AccordionItem'
import TreeView, { toTree, composedPath } from './lib'

const DATA_ITEMS: Array<{ id: string; parent?: string }> = [
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

const IDS = DATA_ITEMS.map(({ id }) => id)

const items = toTree(DATA_ITEMS)

function App() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const {
      'tree-id': { value },
    } = e.currentTarget

    if (IDS.includes(value)) {
      setExpandedItems(composedPath(items, value))
    } else {
      setError('ID not found in the tree')
    }
  }

  return (
    <>
      <h1>Tree view</h1>
      <h2>Open from everywhere</h2>
      <p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="tree-id">
            ID to open
            <input
              type="text"
              name="tree-id"
              id="tree-id"
              defaultValue="2.4.1.1"
              style={{ marginLeft: 5 }}
              required
            />
          </label>
          {Boolean(error) && (
            <span style={{ color: 'red', marginLeft: 5 }}>{error}</span>
          )}
        </form>
      </p>
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
            willExpand
              ? nextExpanded
              : nextExpanded.filter(id => id !== item.id),
          )
        }}
      />
    </>
  )
}

export default App
