import React, { useState } from 'react'
import AccordionItem from './AccordionItem'
import TreeView, { toTree, composedPath, flatten } from './lib'
import { DATA_ITEMS, IDS } from './data'

const items = toTree(DATA_ITEMS)

type ArrayType<A> = A extends Array<infer R> ? R : never
type CustomItem = ArrayType<typeof items>

function getChildrenIds(item: CustomItem) {
  return flatten(item.children).map(i => i.id)
}

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

  function handleChange(
    nextExpandedItems: CustomItem['id'][],
    item: CustomItem,
  ) {
    const willExpand = nextExpandedItems.includes(item.id)

    if (willExpand) {
      setExpandedItems(
        Array.from(new Set([...nextExpandedItems, ...expandedItems])),
      )
      return
    }

    const itemToExclude = [item.id, ...getChildrenIds(item)]
    setExpandedItems(expandedItems.filter(id => !itemToExclude.includes(id)))
  }

  return (
    <>
      <h1>Tree view</h1>
      <h2>Open from everywhere</h2>
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
      <TreeView
        items={items}
        ItemComponent={AccordionItem}
        expandedItems={expandedItems}
        onChange={handleChange}
      />
    </>
  )
}

export default App
